#!/usr/bin/env python3
"""
Backend API Testing for Shri Radhe Beauty & Gift Collection
Tests all CRUD operations for Products, Bookings, Reviews, Services, Gallery, and Admin APIs
"""

import requests
import json
import sys
from datetime import datetime
import base64

# Get backend URL from frontend .env
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('EXPO_PUBLIC_BACKEND_URL='):
                    return line.split('=')[1].strip()
    except:
        pass
    return "https://radhe-glam-shop.preview.emergentagent.com"

BASE_URL = get_backend_url() + "/api"
print(f"Testing backend at: {BASE_URL}")

# Test data
SAMPLE_IMAGE_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

class APITester:
    def __init__(self):
        self.session = requests.Session()
        self.created_ids = {
            'products': [],
            'bookings': [],
            'reviews': [],
            'services': [],
            'gallery': []
        }
        self.test_results = []
        
    def log_result(self, test_name, success, message="", response_data=None):
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'response_data': response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_products_api(self):
        print("=== Testing Products API ===")
        
        # Test 1: GET all products (should work even if empty)
        try:
            response = self.session.get(f"{BASE_URL}/products")
            if response.status_code == 200:
                products = response.json()
                self.log_result("GET /products", True, f"Retrieved {len(products)} products")
            else:
                self.log_result("GET /products", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /products", False, f"Exception: {str(e)}")

        # Test 2: POST create product
        product_data = {
            "name": "Lakme Absolute Lipstick",
            "description": "Long-lasting matte lipstick in vibrant red shade",
            "price": 850.0,
            "category": "Makeup",
            "image": SAMPLE_IMAGE_B64,
            "inStock": True,
            "featured": True
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/products", json=product_data)
            if response.status_code == 200:
                product = response.json()
                product_id = product.get('id')
                if product_id:
                    self.created_ids['products'].append(product_id)
                    self.log_result("POST /products", True, f"Created product with ID: {product_id}")
                else:
                    self.log_result("POST /products", False, "No ID in response", product)
            else:
                self.log_result("POST /products", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /products", False, f"Exception: {str(e)}")

        # Test 3: GET product by ID
        if self.created_ids['products']:
            product_id = self.created_ids['products'][0]
            try:
                response = self.session.get(f"{BASE_URL}/products/{product_id}")
                if response.status_code == 200:
                    product = response.json()
                    self.log_result("GET /products/{id}", True, f"Retrieved product: {product.get('name')}")
                else:
                    self.log_result("GET /products/{id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result("GET /products/{id}", False, f"Exception: {str(e)}")

        # Test 4: GET products by category
        try:
            response = self.session.get(f"{BASE_URL}/products?category=Makeup")
            if response.status_code == 200:
                products = response.json()
                self.log_result("GET /products?category=Makeup", True, f"Found {len(products)} makeup products")
            else:
                self.log_result("GET /products?category=Makeup", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /products?category=Makeup", False, f"Exception: {str(e)}")

        # Test 5: GET featured products
        try:
            response = self.session.get(f"{BASE_URL}/products?featured=true")
            if response.status_code == 200:
                products = response.json()
                self.log_result("GET /products?featured=true", True, f"Found {len(products)} featured products")
            else:
                self.log_result("GET /products?featured=true", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /products?featured=true", False, f"Exception: {str(e)}")

        # Test 6: PUT update product
        if self.created_ids['products']:
            product_id = self.created_ids['products'][0]
            update_data = {
                "name": "Lakme Absolute Lipstick - Updated",
                "description": "Updated description for long-lasting matte lipstick",
                "price": 899.0,
                "category": "Makeup",
                "image": SAMPLE_IMAGE_B64,
                "inStock": True,
                "featured": False
            }
            try:
                response = self.session.put(f"{BASE_URL}/products/{product_id}", json=update_data)
                if response.status_code == 200:
                    product = response.json()
                    self.log_result("PUT /products/{id}", True, f"Updated product: {product.get('name')}")
                else:
                    self.log_result("PUT /products/{id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result("PUT /products/{id}", False, f"Exception: {str(e)}")

        # Test 7: DELETE product (will be done in cleanup)

    def test_bookings_api(self):
        print("=== Testing Bookings API ===")
        
        # Test 1: GET all bookings
        try:
            response = self.session.get(f"{BASE_URL}/bookings")
            if response.status_code == 200:
                bookings = response.json()
                self.log_result("GET /bookings", True, f"Retrieved {len(bookings)} bookings")
            else:
                self.log_result("GET /bookings", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /bookings", False, f"Exception: {str(e)}")

        # Test 2: POST create booking
        booking_data = {
            "name": "Priya Sharma",
            "phone": "+91-9876543210",
            "email": "priya.sharma@email.com",
            "service": "Bridal Makeup",
            "date": "2024-02-15",
            "time": "10:00 AM",
            "message": "Need bridal makeup for morning ceremony",
            "status": "pending"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/bookings", json=booking_data)
            if response.status_code == 200:
                booking = response.json()
                booking_id = booking.get('id')
                if booking_id:
                    self.created_ids['bookings'].append(booking_id)
                    self.log_result("POST /bookings", True, f"Created booking with ID: {booking_id}")
                else:
                    self.log_result("POST /bookings", False, "No ID in response", booking)
            else:
                self.log_result("POST /bookings", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /bookings", False, f"Exception: {str(e)}")

        # Test 3: PUT update booking status
        if self.created_ids['bookings']:
            booking_id = self.created_ids['bookings'][0]
            try:
                response = self.session.put(f"{BASE_URL}/bookings/{booking_id}", json={"status": "confirmed"})
                if response.status_code == 200:
                    booking = response.json()
                    self.log_result("PUT /bookings/{id}", True, f"Updated booking status to: {booking.get('status')}")
                else:
                    self.log_result("PUT /bookings/{id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result("PUT /bookings/{id}", False, f"Exception: {str(e)}")

        # Test 4: GET bookings by status
        try:
            response = self.session.get(f"{BASE_URL}/bookings?status=confirmed")
            if response.status_code == 200:
                bookings = response.json()
                self.log_result("GET /bookings?status=confirmed", True, f"Found {len(bookings)} confirmed bookings")
            else:
                self.log_result("GET /bookings?status=confirmed", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /bookings?status=confirmed", False, f"Exception: {str(e)}")

    def test_reviews_api(self):
        print("=== Testing Reviews API ===")
        
        # Test 1: GET all reviews
        try:
            response = self.session.get(f"{BASE_URL}/reviews")
            if response.status_code == 200:
                reviews = response.json()
                self.log_result("GET /reviews", True, f"Retrieved {len(reviews)} reviews")
            else:
                self.log_result("GET /reviews", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /reviews", False, f"Exception: {str(e)}")

        # Test 2: POST create review
        review_data = {
            "name": "Anjali Verma",
            "rating": 5,
            "comment": "Excellent service! The makeup artist was very professional and the results were amazing. Highly recommend for bridal makeup!",
            "approved": False
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/reviews", json=review_data)
            if response.status_code == 200:
                review = response.json()
                review_id = review.get('id')
                if review_id:
                    self.created_ids['reviews'].append(review_id)
                    self.log_result("POST /reviews", True, f"Created review with ID: {review_id}")
                else:
                    self.log_result("POST /reviews", False, "No ID in response", review)
            else:
                self.log_result("POST /reviews", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /reviews", False, f"Exception: {str(e)}")

        # Test 3: PUT approve review
        if self.created_ids['reviews']:
            review_id = self.created_ids['reviews'][0]
            try:
                response = self.session.put(f"{BASE_URL}/reviews/{review_id}", json={"approved": True})
                if response.status_code == 200:
                    review = response.json()
                    self.log_result("PUT /reviews/{id}", True, f"Approved review: {review.get('approved')}")
                else:
                    self.log_result("PUT /reviews/{id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result("PUT /reviews/{id}", False, f"Exception: {str(e)}")

        # Test 4: GET approved reviews only
        try:
            response = self.session.get(f"{BASE_URL}/reviews?approved=true")
            if response.status_code == 200:
                reviews = response.json()
                self.log_result("GET /reviews?approved=true", True, f"Found {len(reviews)} approved reviews")
            else:
                self.log_result("GET /reviews?approved=true", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /reviews?approved=true", False, f"Exception: {str(e)}")

    def test_services_api(self):
        print("=== Testing Services API ===")
        
        # Test 1: GET all services
        try:
            response = self.session.get(f"{BASE_URL}/services")
            if response.status_code == 200:
                services = response.json()
                self.log_result("GET /services", True, f"Retrieved {len(services)} services")
            else:
                self.log_result("GET /services", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /services", False, f"Exception: {str(e)}")

        # Test 2: POST create service
        service_data = {
            "name": "Hair Styling & Makeup",
            "description": "Complete hair styling and makeup package for special occasions",
            "duration": "2 hours",
            "price": 3500.0,
            "image": SAMPLE_IMAGE_B64,
            "popular": True
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/services", json=service_data)
            if response.status_code == 200:
                service = response.json()
                service_id = service.get('id')
                if service_id:
                    self.created_ids['services'].append(service_id)
                    self.log_result("POST /services", True, f"Created service with ID: {service_id}")
                else:
                    self.log_result("POST /services", False, "No ID in response", service)
            else:
                self.log_result("POST /services", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /services", False, f"Exception: {str(e)}")

        # Test 3: PUT update service
        if self.created_ids['services']:
            service_id = self.created_ids['services'][0]
            update_data = {
                "name": "Hair Styling & Makeup - Premium",
                "description": "Premium hair styling and makeup package with additional services",
                "duration": "2.5 hours",
                "price": 4000.0,
                "image": SAMPLE_IMAGE_B64,
                "popular": True
            }
            try:
                response = self.session.put(f"{BASE_URL}/services/{service_id}", json=update_data)
                if response.status_code == 200:
                    service = response.json()
                    self.log_result("PUT /services/{id}", True, f"Updated service: {service.get('name')}")
                else:
                    self.log_result("PUT /services/{id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result("PUT /services/{id}", False, f"Exception: {str(e)}")

        # Test 4: DELETE service (will be done in cleanup)

    def test_gallery_api(self):
        print("=== Testing Gallery API ===")
        
        # Test 1: GET all gallery items
        try:
            response = self.session.get(f"{BASE_URL}/gallery")
            if response.status_code == 200:
                items = response.json()
                self.log_result("GET /gallery", True, f"Retrieved {len(items)} gallery items")
            else:
                self.log_result("GET /gallery", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /gallery", False, f"Exception: {str(e)}")

        # Test 2: POST add gallery item
        gallery_data = {
            "image": SAMPLE_IMAGE_B64,
            "caption": "Beautiful bridal makeup transformation by our expert team"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/gallery", json=gallery_data)
            if response.status_code == 200:
                item = response.json()
                item_id = item.get('id')
                if item_id:
                    self.created_ids['gallery'].append(item_id)
                    self.log_result("POST /gallery", True, f"Created gallery item with ID: {item_id}")
                else:
                    self.log_result("POST /gallery", False, "No ID in response", item)
            else:
                self.log_result("POST /gallery", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /gallery", False, f"Exception: {str(e)}")

        # Test 3: DELETE gallery item (will be done in cleanup)

    def test_admin_api(self):
        print("=== Testing Admin API ===")
        
        # Test 1: POST admin login with correct credentials
        correct_credentials = {
            "username": "admin",
            "password": "admin123"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/admin/login", json=correct_credentials)
            if response.status_code == 200:
                result = response.json()
                if result.get('success') and result.get('token'):
                    self.log_result("POST /admin/login (correct)", True, f"Login successful, token: {result.get('token')}")
                else:
                    self.log_result("POST /admin/login (correct)", False, "Missing success or token", result)
            else:
                self.log_result("POST /admin/login (correct)", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /admin/login (correct)", False, f"Exception: {str(e)}")

        # Test 2: POST admin login with incorrect credentials
        incorrect_credentials = {
            "username": "admin",
            "password": "wrongpassword"
        }
        
        try:
            response = self.session.post(f"{BASE_URL}/admin/login", json=incorrect_credentials)
            if response.status_code == 401:
                self.log_result("POST /admin/login (incorrect)", True, "Correctly rejected invalid credentials")
            else:
                self.log_result("POST /admin/login (incorrect)", False, f"Expected 401, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /admin/login (incorrect)", False, f"Exception: {str(e)}")

    def cleanup_test_data(self):
        print("=== Cleaning up test data ===")
        
        # Delete created products
        for product_id in self.created_ids['products']:
            try:
                response = self.session.delete(f"{BASE_URL}/products/{product_id}")
                if response.status_code == 200:
                    self.log_result(f"DELETE /products/{product_id}", True, "Product deleted successfully")
                else:
                    self.log_result(f"DELETE /products/{product_id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result(f"DELETE /products/{product_id}", False, f"Exception: {str(e)}")

        # Delete created services
        for service_id in self.created_ids['services']:
            try:
                response = self.session.delete(f"{BASE_URL}/services/{service_id}")
                if response.status_code == 200:
                    self.log_result(f"DELETE /services/{service_id}", True, "Service deleted successfully")
                else:
                    self.log_result(f"DELETE /services/{service_id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result(f"DELETE /services/{service_id}", False, f"Exception: {str(e)}")

        # Delete created gallery items
        for item_id in self.created_ids['gallery']:
            try:
                response = self.session.delete(f"{BASE_URL}/gallery/{item_id}")
                if response.status_code == 200:
                    self.log_result(f"DELETE /gallery/{item_id}", True, "Gallery item deleted successfully")
                else:
                    self.log_result(f"DELETE /gallery/{item_id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_result(f"DELETE /gallery/{item_id}", False, f"Exception: {str(e)}")

    def run_all_tests(self):
        print("Starting comprehensive backend API testing...\n")
        
        self.test_products_api()
        self.test_bookings_api()
        self.test_reviews_api()
        self.test_services_api()
        self.test_gallery_api()
        self.test_admin_api()
        self.cleanup_test_data()
        
        # Summary
        print("=== TEST SUMMARY ===")
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['message']}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)