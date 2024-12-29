const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("./database/dbconfig");
const brokerRoutes = require("./routes/broker.routes");
const houseRoutes = require("./routes/house.routes");
const carRoutes = require("./routes/car.routes");
const userRoutes = require('./routes/user.routes');

dotenv.config();
const PORT = 5000;
const app = express();

// Ensure 'public/images' folder exists
const imagesPath = path.join(__dirname, "public", "images");
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Use route modules for different resources
app.use("/brokers", brokerRoutes); // Routes for broker operations
app.use("/houses", houseRoutes); // Routes for house operations
app.use("/cars", carRoutes); // Routes for car operations
app.use('/users', userRoutes);
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Image upload route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/images/${req.file.filename}`;
  res.status(201).json({ message: "Image uploaded successfully", imageUrl });
});


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
