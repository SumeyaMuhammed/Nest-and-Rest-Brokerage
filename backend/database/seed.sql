-- Insert sample roles
INSERT INTO `Role` (role_name) VALUES
('Admin'),
('User');

-- Insert sample brokers
INSERT INTO `Broker` (name, email, phone, address, status) VALUES
('John Doe', 'john.doe@example.com', '555-1234', '123 Main St, Cityville', 'available'),
('Jane Smith', 'jane.smith@example.com', '555-5678', '456 Elm St, Townsville', 'busy'),
('Alice Johnson', 'alice.johnson@example.com', '555-7890', '789 Birch St, Citytown', 'available'),
('Bob Brown', 'bob.brown@example.com', '555-3456', '345 Cedar St, Urbanville', 'busy'),
('Charlie White', 'charlie.white@example.com', '555-9012', '901 Pine St, Suburbia', 'available'),
('Diana Green', 'diana.green@example.com', '555-2345', '234 Maple St, Towncity', 'busy'),
('Ethan Black', 'ethan.black@example.com', '555-6789', '678 Willow St, Metrocity', 'available'),
('Fiona Gray', 'fiona.gray@example.com', '555-4321', '432 Oak St, Smalltown', 'busy'),
('George Blue', 'george.blue@example.com', '555-8765', '876 Elm St, Countryside', 'available'),
('Hannah Red', 'hannah.red@example.com', '555-2109', '210 Spruce St, Lakeside', 'busy');

-- Insert sample houses
INSERT INTO `House` (title, description, price, num_bedrooms, num_bathrooms, area_sqft, location, image_url, broker_id) VALUES
('Modern Family Home', 'A beautiful 4-bedroom house with a spacious yard.', 350000, 4, 3, 2500, '789 Oak St, Villagetown', 'house1.jpg', 1),
('Luxury Villa', 'An exquisite villa with ocean views and private pool.', 1200000, 5, 4, 4500, '101 Pine St, Beachside', 'villa1.jpg', 2),
('Cozy Cottage', 'Charming 2-bedroom cottage perfect for a small family.', 200000, 2, 1, 1200, '202 Cherry St, Woodside', 'cottage1.jpg', 3),
('Downtown Apartment', 'Spacious 3-bedroom apartment in the city center.', 450000, 3, 2, 1800, '303 Maple St, Metropolis', 'apartment1.jpg', 4),
('Suburban House', '4-bedroom house in a quiet suburban neighborhood.', 300000, 4, 3, 2200, '404 Birch St, Suburbia', 'house2.jpg', 5),
('Mountain Retreat', 'Secluded cabin with stunning mountain views.', 500000, 3, 2, 2000, '505 Pine St, Mountainview', 'cabin1.jpg', 6),
('Beachfront Bungalow', '3-bedroom bungalow with direct beach access.', 750000, 3, 2, 2000, '606 Beach St, Oceanside', 'bungalow1.jpg', 7),
('Victorian Mansion', 'Elegant 6-bedroom mansion with historic charm.', 1500000, 6, 5, 5000, '707 Elm St, Oldtown', 'mansion1.jpg', 8),
('Urban Loft', 'Stylish loft in a trendy downtown area.', 400000, 2, 2, 1600, '808 Cedar St, Urbancore', 'loft1.jpg', 9),
('Country Farmhouse', 'Quaint farmhouse with modern amenities.', 600000, 4, 3, 3000, '909 Spruce St, Countryside', 'farmhouse1.jpg', 10);

-- Insert sample cars
INSERT INTO `Car` (title, description, price, make, model, year, mileage, color, image_url, broker_id) VALUES
('Toyota Corolla', 'Reliable sedan with excellent fuel economy.', 15000, 'Toyota', 'Corolla', 2020, 25000, 'Blue', 'corolla.jpg', 1),
('Ford Mustang', 'Classic muscle car with powerful V8 engine.', 30000, 'Ford', 'Mustang', 2018, 15000, 'Red', 'mustang.jpg', 2),
('Honda Civic', 'Compact car with great fuel efficiency.', 20000, 'Honda', 'Civic', 2019, 30000, 'Black', 'civic.jpg', 3),
('Chevrolet Camaro', 'Sports car with a sleek design and strong performance.', 35000, 'Chevrolet', 'Camaro', 2021, 10000, 'Yellow', 'camaro.jpg', 4),
('Tesla Model 3', 'Electric vehicle with advanced features.', 45000, 'Tesla', 'Model 3', 2022, 5000, 'White', 'model3.jpg', 5),
('BMW 3 Series', 'Luxury sedan with exceptional handling.', 40000, 'BMW', '3 Series', 2020, 20000, 'Gray', 'bmw3.jpg', 6),
('Audi A4', 'Premium sedan with high-tech features.', 42000, 'Audi', 'A4', 2021, 15000, 'Silver', 'audiA4.jpg', 7),
('Mercedes-Benz C-Class', 'Elegant sedan with a smooth ride.', 50000, 'Mercedes-Benz', 'C-Class', 2019, 25000, 'Black', 'cclass.jpg', 8),
('Jeep Wrangler', 'Off-road SUV built for adventure.', 38000, 'Jeep', 'Wrangler', 2020, 30000, 'Green', 'wrangler.jpg', 9),
('Hyundai Sonata', 'Affordable sedan with a comfortable interior.', 22000, 'Hyundai', 'Sonata', 2018, 40000, 'Blue', 'sonata.jpg', 10);

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
