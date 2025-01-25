-- Seed Role Table
INSERT INTO `Role` (role_name) VALUES 
('Admin'),
('User');

-- Seed Broker Table
INSERT INTO `Broker` (name, email, phone, address, status) VALUES 
('Alice Johnson', 'alice@example.com', '123-456-7890', '123 Main Street, City A', 'available'),
('Bob Smith', 'bob@example.com', '987-654-3210', '456 Elm Street, City B', 'busy'),
('Carol White', 'carol@example.com', '555-555-5555', '789 Pine Street, City C', 'available'),
('David Brown', 'david@example.com', '222-333-4444', '101 Maple Lane, City D', 'available'),
('Emily Green', 'emily@example.com', '444-555-6666', '505 Oak Drive, City E', 'busy'),
('Frank Harris', 'frank@example.com', '777-888-9999', '606 Birch Road, City F', 'available'),
('Grace Lewis', 'grace@example.com', '888-999-0000', '707 Cedar Street, City G', 'available'),
('Hannah Adams', 'hannah@example.com', '111-222-3333', '808 Pine Avenue, City H', 'busy'),
('Ian Cooper', 'ian@example.com', '444-777-1111', '909 Walnut Street, City I', 'available'),
('Jack Turner', 'jack@example.com', '333-666-9999', '1010 Willow Drive, City J', 'available');

-- Seed House Table
INSERT INTO `House` (title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, image_url, broker_name) VALUES 
('Modern Family Home', 'A spacious family home with a modern design.', 350000.00, 4, 3, 2500.00, '123 Oak Avenue, Suburb A', 'http://localhost:5000/images/houses/modern-family-home.jpg', 'Alice Johnson'),
('Cozy Cottage', 'A cozy cottage perfect for small families or couples.', 150000.00, 2, 1, 1200.00, '45 Birch Road, Countryside', 'http://localhost:5000/images/houses/cozy-cottage.jpg', 'Carol White'),
('Luxury Villa', 'A stunning villa with a private pool and garden.', 850000.00, 5, 4, 4000.00, '678 Palm Beach, City F', 'http://localhost:5000/images/houses/luxury-villa.jpg', 'Frank Harris'),
('Urban Loft', 'A modern loft in the heart of the city.', 450000.00, 3, 2, 1800.00, '789 Downtown Street, City G', 'http://localhost:5000/images/houses/urban-loft.jpg', 'Grace Lewis'),
('Countryside Retreat', 'A beautiful retreat surrounded by nature.', 275000.00, 3, 2, 2000.00, '101 Rural Lane, Countryside', 'http://localhost:5000/images/houses/countryside-retreat.jpg', 'David Brown'),
('Beachside Bungalow', 'A charming bungalow with ocean views.', 650000.00, 4, 3, 3000.00, '202 Coastal Road, City I', 'http://localhost:5000/images/houses/beachside-bungalow.jpg', 'Ian Cooper'),
('Mountain Cabin', 'A cozy cabin in the mountains.', 325000.00, 3, 2, 1500.00, '303 Highland Trail, City A', 'http://localhost:5000/images/houses/mountain-cabin.jpg', 'Alice Johnson'),
('Suburban House', 'A spacious house in a family-friendly neighborhood.', 425000.00, 5, 3, 2800.00, '404 Suburbia Road, City D', 'http://localhost:5000/images/houses/suburban-house.jpg', 'David Brown'),
('Historic Mansion', 'A beautifully restored historic mansion.', 950000.00, 6, 5, 5000.00, '505 Heritage Way, City J', 'http://localhost:5000/images/houses/historic-mansion.jpg', 'Jack Turner'),
('Contemporary Home', 'A sleek, contemporary design with high-end finishes.', 550000.00, 4, 3, 2200.00, '606 Innovation Lane, City F', 'http://localhost:5000/images/houses/contemporary-home.jpg', 'Frank Harris');

-- Seed Car Table
INSERT INTO `Car` (title, description, price, make, model, year, mileage, color, image_url, broker_name) VALUES 
('Sporty Sedan', 'A sleek and sporty sedan in excellent condition.', 25000.00, 'Toyota', 'Camry', 2021, 15000, 'Red', 'http://localhost:5000/images/cars/sporty-sedan.jpg', 'Alice Johnson'),
('Luxury SUV', 'A luxury SUV with all the latest features.', 50000.00, 'BMW', 'X5', 2022, 10000, 'Black', 'http://localhost:5000/images/cars/luxury-suv.jpg', 'Carol White'),
('Compact Hatchback', 'A compact and efficient hatchback.', 18000.00, 'Honda', 'Civic', 2020, 20000, 'Blue', 'http://localhost:5000/images/cars/compact-hatchback.jpg', 'Grace Lewis'),
('Electric Car', 'A fully electric car with a long range.', 35000.00, 'Tesla', 'Model 3', 2023, 5000, 'White', 'http://localhost:5000/images/cars/electric-car.jpg', 'Frank Harris'),
('Off-Road SUV', 'An off-road SUV for adventure enthusiasts.', 40000.00, 'Jeep', 'Wrangler', 2021, 12000, 'Green', 'http://localhost:5000/images/cars/off-road-suv.jpg', 'Jack Turner'),
('Luxury Sedan', 'A premium sedan with top-notch comfort.', 60000.00, 'Mercedes-Benz', 'E-Class', 2022, 8000, 'Silver', 'http://localhost:5000/images/cars/luxury-sedan.jpg', 'Ian Cooper'),
('Pickup Truck', 'A reliable pickup truck for heavy-duty tasks.', 30000.00, 'Ford', 'F-150', 2020, 25000, 'Blue', 'http://localhost:5000/images/cars/pickup-truck.jpg', 'David Brown'),
('Sports Coupe', 'A high-performance sports coupe.', 70000.00, 'Porsche', '911', 2023, 3000, 'Yellow', 'http://localhost:5000/images/cars/sports-coupe.jpg', 'Grace Lewis'),
('Family Minivan', 'A spacious minivan ideal for families.', 27000.00, 'Toyota', 'Sienna', 2021, 15000, 'Grey', 'http://localhost:5000/images/cars/family-minivan.jpg', 'Alice Johnson'),
('Classic Muscle Car', 'A restored classic muscle car.', 45000.00, 'Ford', 'Mustang', 1969, 50000, 'Black', 'http://localhost:5000/images/cars/classic-muscle-car.jpg', 'Frank Harris');

-- Insert sample users
INSERT INTO `User` (username, password, email, role_id, status) VALUES
('admin_user', '$2b$10$somehashedpassword', 'admin@example.com', 1, 'active'),
('user_one', '$2b$10$hashedpassword1', 'user1@example.com', 2, 'active'),
('user_two', '$2b$10$hashedpassword2', 'user2@example.com', 2, 'active'),
('user_three', '$2b$10$hashedpassword3', 'user3@example.com', 2, 'active'),
('user_four', '$2b$10$hashedpassword4', 'user4@example.com', 2, 'active'),
('user_five', '$2b$10$hashedpassword5', 'user5@example.com', 2, 'active'),
('user_six', '$2b$10$hashedpassword6', 'user6@example.com', 2, 'active'),
('user_seven', '$2b$10$hashedpassword7', 'user7@example.com', 2, 'active'),
('user_eight', '$2b$10$hashedpassword8', 'user8@example.com', 2, 'active'),
('user_nine', '$2b$10$hashedpassword9', 'user9@example.com', 2, 'active');
