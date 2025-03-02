const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Debug: Check if environment variables are loading
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Routes
const apiroutes = require('./route/ApiRoute');  // Ensure correct path
app.use('/api', apiroutes);  

const viewRoutes = require('./route/ViewRoute'); // Ensure correct path
app.use('/',viewRoutes);



// Enable method-override for DELETE requests
app.use(methodOverride('_method'));


// Database connection with fallback
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mondalsheshadri19:OVvfYocevmInWldX@cluster0.cchpd.mongodb.net/code_snippet";
console.log(mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully!"))
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err.message);
  process.exit(1); // Exit if connection fails
});
  

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
