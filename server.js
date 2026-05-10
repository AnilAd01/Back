const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware first
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://front-delta-mocha.vercel.app"
  ],
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/home-section", require("./routes/homeSectionRoutes"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/team", require("./routes/team"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/blog", require("./routes/blog"));
app.use("/api/agency", require("./routes/agency"));
app.use("/api/services", require("./routes/services"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/showcase", require("./routes/showcase"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});