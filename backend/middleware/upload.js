const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the 'uploads/' folder exists or create it
    cb(null, 'uploads/');  // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    // Set the filename with a timestamp to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname));  // Filename with extension
  },
});

// File type filter (optional, but highly recommended for security)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Allowed image formats
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);  // Reject the file
  }
};

// Multer upload instance with size limit and file type validation
const upload = multer({
  storage,  // Storage configuration defined above
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter,  // File type validation function
});

module.exports = upload;
