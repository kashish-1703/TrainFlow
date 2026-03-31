const mongoose = require("mongoose")

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connected failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase