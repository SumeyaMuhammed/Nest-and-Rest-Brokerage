const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./database/dbconfig");
const brokerRoutes = require("./routes/broker.routes");
const houseRoutes = require("./routes/house.routes");
const carRoutes = require("./routes/car.routes");
const userRoutes = require('./routes/user.routes');

const path = require('path'); // Import path module

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use route modules for different resources
app.use("/brokers", brokerRoutes); // Routes for broker operations
app.use("/houses", houseRoutes); // Routes for house operations
app.use("/cars", carRoutes); // Routes for car operations
app.use('/users', userRoutes);

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Database connected successfully");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
