const mongoose = require("mongoose");
require("dotenv").config(); // Ensure this is here

const NODE_ENV = process.env.NODE_ENV || "DEV"; // Default to DEV if undefined
const MONGO_URI = process.env[`${NODE_ENV}_MONGODB_URI`]; // Fetch correct URI

if (!MONGO_URI) {
  console.error(`Error: Missing MongoDB URI for environment: ${NODE_ENV}`);
  process.exit(1); // Exit if URI is missing
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected for ${NODE_ENV} environment`))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
