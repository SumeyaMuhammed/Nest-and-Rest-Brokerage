# Nest and Ride Brokerage

## Description
Nest and Ride Brokerage is a web application designed to facilitate the buying of properties. The application provides a user-friendly interface for both brokers and clients, allowing them to manage listings, view property details, and connect with each other seamlessly.

## Features
- User authentication and authorization
- Admin dashboard for managing brokers and properties
- Add, edit, and delete property listings
- Image uploads for property listings
- Responsive design for mobile and desktop users
- Search functionality for properties
- Detailed views for each property

## Screenshots
![Landing Page](Screenshots/landingPage.png)  
*This is the landing page of the application, showcasing its purpose and welcoming users.*

![Signup Page](Screenshots/signup.png) 
*This is the signup page of the application, enabling new users to create an account by providing their details and setting up their credentials.*

![Login Page](Screenshots/login.png) 
*This is the login page of the application, allowing users and admins to securely sign in using their credentials to access their accounts and redirect to appropriate page.*

![Admin Dashboard](Screenshots/adminDashboard.png)  
*The admin dashboard allows administrators to manage brokers and property listings.*

![Manage Car](Screenshots/managecars.png)  
*This screen shows the interface for managing car listings, including editing and deleting options.*

![Add Car](Screenshots/addCar.png)  
*The add car page enables admins to add new car listings with all necessary details and images.*

![Manage House](Screenshots/manageHouses.png)  
*This screen shows the interface for managing house listings, including editing and deleting options.*

![Add House](Screenshots/addHouse.png)  
*The add house page enables admins to add new house listings with all necessary details and images.*

![Manage Broker](Screenshots/manageBroker.png)  
*This page provides tools for administrators to manage broker information and assignments.*

![Add Broker](Screenshots/addBrokers.png)  
*The add broker interface allows admins to onboard new brokers to the platform.*

![User Dashboard](Screenshots/usersDashboard.png)  
*The user dashboard displays property listings with filtering options and detailed views.*

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/SumeyaMuhammed/Nest-and-Ride-Brokerage.git
   cd nest-and-ride-brokerage
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up the database:
   - Ensure MySQL is installed and running on your machine.
   - Create a new database named `brokerage`:
     ```sql
     CREATE DATABASE brokerage;
     ```
   - Import the database schema:
     ```bash
     mysql -u [username] -p brokerage < backend/database/schema.sql
     ```
   - Import the seed data for testing:
     ```bash
     mysql -u [username] -p brokerage < backend/database/seed.sql
     ```

4. Configure the `.env` file:
   - Copy the example file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your database credentials:
     ```plaintext
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=brokerage
     DB_PORT=3306
     JWT_SECRET=your_jwt_secret
     ```

5. Start the backend server:
   ```bash
   node app.js
   ```

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
2. Start the frontend application:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173` to access the application.

## Database Configuration
The database connection is managed using the `dbconfig.js` file in the backend directory. Ensure that the `.env` file is correctly set up as described above. The provided schema includes tables for roles, brokers, houses, cars, and users, with appropriate relationships.

### Schema Overview
- **Role**: Manages user roles (e.g., Admin, User).
- **Broker**: Contains information about brokers and their availability.
- **House**: Stores details about houses, including broker assignments.
- **Car**: Stores details about cars, including broker assignments.
- **User**: Handles user accounts and their roles.

### Seed Data
To populate the database with sample data for testing, use the `seed.sql` file provided in the `backend/database/` directory. This file includes sample entries for houses, cars, brokers, and users.

Import the seed data:
```bash
mysql -u [username] -p brokerage < backend/database/seed.sql
```

## .env Configuration
To access the database, ensure your `.env` file contains the following settings:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=brokerage
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Information
For any inquiries or support, please contact:

- Sumeya Muhammed - [sumenaweya@gmail.com](mailto:sumenaweya@gmail.com)
- GitHub: [SumeyaMuhammed](https://github.com/SumeyaMuhammed)
- LinkedIn: [Sumeya Muhammed](https://www.linkedin.com/in/sumeya-muhammed-a83168319/)

