-- Create Role Table First (Ensure it uses InnoDB engine)
CREATE TABLE IF NOT EXISTS `Role` (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create Broker Table
CREATE TABLE IF NOT EXISTS `Broker` (
    broker_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    status ENUM('available', 'busy') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Create House Table (Includes Broker Name and Validates Availability in Application Logic)
CREATE TABLE IF NOT EXISTS `House` (
    house_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    num_bedrooms INT NOT NULL,
    num_bathrooms INT NOT NULL,
    area_sqft DECIMAL(10, 2),
    location TEXT,
    image_url VARCHAR(255), -- Store the path/URL to the house image
    broker_name VARCHAR(255) NOT NULL, -- Store the broker's name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_available_broker_house CHECK (broker_name IN (SELECT name FROM Broker WHERE status = 'available'))
) ENGINE=InnoDB;

-- Create Car Table (Includes Broker Name and Validates Availability in Application Logic)
CREATE TABLE IF NOT EXISTS `Car` (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    mileage INT,
    color VARCHAR(50),
    image_url VARCHAR(255), -- Store the path/URL to the car image
    broker_name VARCHAR(255) NOT NULL, -- Store the broker's name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_available_broker_car CHECK (broker_name IN (SELECT name FROM Broker WHERE status = 'available'))
) ENGINE=InnoDB;

-- Create User Table (Foreign Key References Role Table)
CREATE TABLE IF NOT EXISTS `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id INT ,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES `Role`(role_id) ON DELETE SET NULL
) ENGINE=InnoDB;
