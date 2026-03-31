const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Workout", workoutSchema);