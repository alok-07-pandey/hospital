const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const hospitalRoutes = require("./routes/hospitalRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for All Origins
app.use(cors()); // This allows all origins
app.use(express.json());

app.use("/api/v1/hospitals", hospitalRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
