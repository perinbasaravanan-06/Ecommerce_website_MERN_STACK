require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const port = process.env.PORT || 4000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true); // allow postman or server-to-server
      if(allowedOrigins.indexOf(origin) === -1){
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);


// Connect DB
connectDB();

// Routes
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

// Static for images
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${BASE_URL}/images/${req.file.filename}`,
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on ${BASE_URL}`);
});
