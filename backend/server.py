from fastapi import FastAPI, APIRouter, HTTPException, Body
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
import hashlib

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def str_object_id(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# ============= Models =============

class Product(BaseModel):
    name: str
    description: str
    price: float
    category: str  # Makeup, Skincare, Fragrances, Haircare, Gift Items
    image: str  # base64
    inStock: bool = True
    featured: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ProductResponse(Product):
    id: str

class Booking(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: str
    date: str
    time: str
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, completed, cancelled
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class BookingResponse(Booking):
    id: str

class Review(BaseModel):
    name: str
    rating: int  # 1-5
    comment: str
    approved: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ReviewResponse(Review):
    id: str

class Service(BaseModel):
    name: str
    description: str
    duration: str  # e.g., "45 mins"
    price: float
    image: str  # base64
    popular: bool = False

class ServiceResponse(Service):
    id: str

class GalleryItem(BaseModel):
    image: str  # base64
    caption: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class GalleryResponse(GalleryItem):
    id: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None

# ============= Products APIs =============

@api_router.get("/products", response_model=List[ProductResponse])
async def get_products(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query['category'] = category
    if featured is not None:
        query['featured'] = featured
    
    products = await db.products.find(query).to_list(100)
    return [ProductResponse(id=str(p['_id']), **{k: v for k, v in p.items() if k != '_id'}) for p in products]

@api_router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return ProductResponse(id=str(product['_id']), **{k: v for k, v in product.items() if k != '_id'})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/products", response_model=ProductResponse)
async def create_product(product: Product):
    product_dict = product.dict()
    result = await db.products.insert_one(product_dict)
    product_dict['id'] = str(result.inserted_id)
    return ProductResponse(**product_dict)

@api_router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, product: Product):
    try:
        result = await db.products.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": product.dict()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        updated_product = await db.products.find_one({"_id": ObjectId(product_id)})
        return ProductResponse(id=str(updated_product['_id']), **{k: v for k, v in updated_product.items() if k != '_id'})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    try:
        result = await db.products.delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============= Bookings APIs =============

@api_router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings(status: Optional[str] = None):
    query = {}
    if status:
        query['status'] = status
    
    bookings = await db.bookings.find(query).sort("createdAt", -1).to_list(100)
    return [BookingResponse(id=str(b['_id']), **{k: v for k, v in b.items() if k != '_id'}) for b in bookings]

@api_router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: Booking):
    booking_dict = booking.dict()
    result = await db.bookings.insert_one(booking_dict)
    booking_dict['id'] = str(result.inserted_id)
    return BookingResponse(**booking_dict)

@api_router.put("/bookings/{booking_id}", response_model=BookingResponse)
async def update_booking_status(booking_id: str, status: str = Body(..., embed=True)):
    try:
        result = await db.bookings.update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"status": status}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        updated_booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
        return BookingResponse(id=str(updated_booking['_id']), **{k: v for k, v in updated_booking.items() if k != '_id'})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============= Reviews APIs =============

@api_router.get("/reviews", response_model=List[ReviewResponse])
async def get_reviews(approved: Optional[bool] = None):
    query = {}
    if approved is not None:
        query['approved'] = approved
    
    reviews = await db.reviews.find(query).sort("createdAt", -1).to_list(100)
    return [ReviewResponse(id=str(r['_id']), **{k: v for k, v in r.items() if k != '_id'}) for r in reviews]

@api_router.post("/reviews", response_model=ReviewResponse)
async def create_review(review: Review):
    review_dict = review.dict()
    result = await db.reviews.insert_one(review_dict)
    review_dict['id'] = str(result.inserted_id)
    return ReviewResponse(**review_dict)

@api_router.put("/reviews/{review_id}", response_model=ReviewResponse)
async def approve_review(review_id: str, approved: bool = Body(..., embed=True)):
    try:
        result = await db.reviews.update_one(
            {"_id": ObjectId(review_id)},
            {"$set": {"approved": approved}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Review not found")
        
        updated_review = await db.reviews.find_one({"_id": ObjectId(review_id)})
        return ReviewResponse(id=str(updated_review['_id']), **{k: v for k, v in updated_review.items() if k != '_id'})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============= Services APIs =============

@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    services = await db.services.find().to_list(100)
    return [ServiceResponse(id=str(s['_id']), **{k: v for k, v in s.items() if k != '_id'}) for s in services]

@api_router.post("/services", response_model=ServiceResponse)
async def create_service(service: Service):
    service_dict = service.dict()
    result = await db.services.insert_one(service_dict)
    service_dict['id'] = str(result.inserted_id)
    return ServiceResponse(**service_dict)

@api_router.put("/services/{service_id}", response_model=ServiceResponse)
async def update_service(service_id: str, service: Service):
    try:
        result = await db.services.update_one(
            {"_id": ObjectId(service_id)},
            {"$set": service.dict()}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        
        updated_service = await db.services.find_one({"_id": ObjectId(service_id)})
        return ServiceResponse(id=str(updated_service['_id']), **{k: v for k, v in updated_service.items() if k != '_id'})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    try:
        result = await db.services.delete_one({"_id": ObjectId(service_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Service not found")
        return {"message": "Service deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============= Gallery APIs =============

@api_router.get("/gallery", response_model=List[GalleryResponse])
async def get_gallery():
    items = await db.gallery.find().sort("createdAt", -1).to_list(100)
    return [GalleryResponse(id=str(i['_id']), **{k: v for k, v in i.items() if k != '_id'}) for i in items]

@api_router.post("/gallery", response_model=GalleryResponse)
async def add_gallery_item(item: GalleryItem):
    item_dict = item.dict()
    result = await db.gallery.insert_one(item_dict)
    item_dict['id'] = str(result.inserted_id)
    return GalleryResponse(**item_dict)

@api_router.delete("/gallery/{item_id}")
async def delete_gallery_item(item_id: str):
    try:
        result = await db.gallery.delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Gallery item not found")
        return {"message": "Gallery item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# ============= Admin APIs =============

@api_router.post("/admin/login", response_model=AdminResponse)
async def admin_login(credentials: AdminLogin):
    # Simple admin authentication (username: admin, password: admin123)
    # In production, use proper password hashing and JWT tokens
    hashed_password = hashlib.sha256(credentials.password.encode()).hexdigest()
    
    if credentials.username == "admin" and credentials.password == "admin123":
        return AdminResponse(
            success=True,
            message="Login successful",
            token="admin_token_" + credentials.username
        )
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# ============= Seed Data API =============

@api_router.post("/seed-data")
async def seed_data():
    """Seed initial data for demo purposes"""
    
    # Check if data already exists
    product_count = await db.products.count_documents({})
    if product_count > 0:
        return {"message": "Data already seeded"}
    
    # Seed products (with placeholder images - will be replaced with actual base64)
    products = [
        {
            "name": "Lakme Perfecting Liquid Foundation",
            "description": "Flawless finish foundation with SPF 25. Lightweight and long-lasting.",
            "price": 699.0,
            "category": "Makeup",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "inStock": True,
            "featured": True,
            "createdAt": datetime.utcnow()
        },
        {
            "name": "Maybelline Fit Me Foundation",
            "description": "Lightweight foundation that matches your skin tone perfectly.",
            "price": 499.0,
            "category": "Makeup",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "inStock": True,
            "featured": True,
            "createdAt": datetime.utcnow()
        },
        {
            "name": "Himalaya Nourishing Face Cream",
            "description": "Intensive nourishment for soft, supple skin. Enriched with aloe vera.",
            "price": 175.0,
            "category": "Skincare",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "inStock": True,
            "featured": True,
            "createdAt": datetime.utcnow()
        },
        {
            "name": "Engage Perfume Gift Set",
            "description": "Premium fragrance gift set perfect for any occasion.",
            "price": 1299.0,
            "category": "Gift Items",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "inStock": True,
            "featured": True,
            "createdAt": datetime.utcnow()
        }
    ]
    await db.products.insert_many(products)
    
    # Seed services
    services = [
        {
            "name": "Bridal Makeup",
            "description": "Complete bridal makeup package with hair styling and draping.",
            "duration": "3 hours",
            "price": 8999.0,
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "popular": True
        },
        {
            "name": "Party Makeup",
            "description": "Glamorous party makeup to make you stand out.",
            "duration": "1.5 hours",
            "price": 2499.0,
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "popular": True
        },
        {
            "name": "Facial Treatment",
            "description": "Deep cleansing and nourishing facial treatment.",
            "duration": "1 hour",
            "price": 999.0,
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
            "popular": False
        }
    ]
    await db.services.insert_many(services)
    
    # Seed reviews
    reviews = [
        {
            "name": "Priya Sharma",
            "rating": 5,
            "comment": "Amazing service! The bridal makeup was absolutely stunning. Highly recommend!",
            "approved": True,
            "createdAt": datetime.utcnow()
        },
        {
            "name": "Anjali Verma",
            "rating": 5,
            "comment": "Great collection of products and very helpful staff. Love shopping here!",
            "approved": True,
            "createdAt": datetime.utcnow()
        },
        {
            "name": "Sneha Patel",
            "rating": 4,
            "comment": "Good quality products at reasonable prices. Will visit again.",
            "approved": True,
            "createdAt": datetime.utcnow()
        }
    ]
    await db.reviews.insert_many(reviews)
    
    return {"message": "Data seeded successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
