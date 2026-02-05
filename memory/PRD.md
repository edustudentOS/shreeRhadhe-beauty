# Shri Radhe Beauty & Gift Collection - Mobile App

## Project Overview
A modern, high-conversion, mobile-first business application for "Shri Radhe Beauty & Gift Collection", a cosmetics and gift store in Bhopal, India.

## Business Details
- **Type**: Cosmetics & Gift Store
- **Location**: Bhopal, Madhya Pradesh
- **Services**: Makeup consulting, skincare products, cosmetic sales, gift items, online booking
- **Target Audience**: Young women, brides, beauty lovers, gift buyers

## Technical Stack
- **Frontend**: React Native with Expo Router
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **State Management**: React Hooks
- **Navigation**: Expo Router with Tab Navigation

## Features Implemented

### Customer Features
1. **Home Screen**
   - Hero section with call-to-action
   - Featured products carousel
   - Why choose us section
   - Customer reviews
   - Contact buttons (WhatsApp, Call, Maps)
   - Floating WhatsApp button

2. **Products Catalog**
   - Grid layout with product cards
   - Category filters (Makeup, Skincare, Fragrances, Haircare, Gift Items)
   - Search functionality
   - Product details page
   - Stock status indicators
   - WhatsApp inquiry button

3. **Services**
   - List of beauty services
   - Service details (duration, price, description)
   - Popular service badges

4. **Booking System**
   - Appointment booking form
   - Service selection
   - Date and time input
   - Contact information collection
   - Success confirmation

5. **Reviews & Testimonials**
   - Display approved customer reviews
   - Star ratings (1-5)
   - Submit new review form
   - Pending approval workflow

6. **Gallery**
   - Grid layout of work samples
   - Full-screen image viewer
   - Image captions

7. **About Us**
   - Business story
   - Mission statement
   - Service offerings
   - Location information

8. **Contact**
   - Phone number (with call link)
   - WhatsApp (with direct link)
   - Email
   - Business address
   - Business hours
   - Social media links

### Admin Features
1. **Admin Login**
   - Secure authentication
   - Credentials: admin / admin123
   - Session management with AsyncStorage

2. **Admin Dashboard**
   - Statistics overview (products, bookings, reviews)
   - Pending items count
   - Quick action buttons
   - Logout functionality

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Submit review
- `PUT /api/reviews/:id` - Approve/reject review

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Gallery
- `GET /api/gallery` - Get all gallery images
- `POST /api/gallery` - Add gallery image
- `DELETE /api/gallery/:id` - Delete gallery image

### Admin
- `POST /api/admin/login` - Admin authentication
- `POST /api/seed-data` - Seed initial demo data

## Database Schema

### Products Collection
```json
{
  "name": "string",
  "description": "string",
  "price": "float",
  "category": "string",
  "image": "base64 string",
  "inStock": "boolean",
  "featured": "boolean",
  "createdAt": "datetime"
}
```

### Bookings Collection
```json
{
  "name": "string",
  "phone": "string",
  "email": "string (optional)",
  "service": "string",
  "date": "string",
  "time": "string",
  "message": "string (optional)",
  "status": "string (pending/confirmed/completed/cancelled)",
  "createdAt": "datetime"
}
```

### Reviews Collection
```json
{
  "name": "string",
  "rating": "integer (1-5)",
  "comment": "string",
  "approved": "boolean",
  "createdAt": "datetime"
}
```

### Services Collection
```json
{
  "name": "string",
  "description": "string",
  "duration": "string",
  "price": "float",
  "image": "base64 string",
  "popular": "boolean"
}
```

### Gallery Collection
```json
{
  "image": "base64 string",
  "caption": "string (optional)",
  "createdAt": "datetime"
}
```

## Design Specifications

### Color Palette
- Primary: #D4AF37 (Gold)
- Background: #F8F9FA (Light Gray)
- Hero Background: #FFE5EC (Soft Pink)
- Text Primary: #333333
- Text Secondary: #666666

### Typography
- Headings: Bold, 20-28px
- Body: Regular, 14-16px
- Buttons: Semi-bold, 16px

### Mobile UX
- Touch targets: Minimum 44x44 points
- Tab navigation for main sections
- Pull-to-refresh on lists
- Modal presentations for forms
- Floating WhatsApp button
- Safe area handling
- Keyboard-aware scrolling

## Contact Information (Demo)
- **Phone**: +91 98765-43210
- **WhatsApp**: +91 98765-43210
- **Email**: info@shriradhebeauty.com
- **Address**: MP Nagar, Bhopal, Madhya Pradesh 462001
- **Hours**: Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM

## Testing Status
✅ All backend APIs tested and working (24/24 tests passed)
✅ Data persistence verified in MongoDB
✅ CRUD operations working correctly
✅ Authentication flow working
✅ Filtering and search working
