const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");

dotenv.config();
connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working"});
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/workouts", require("./routes/workoutRoutes"));