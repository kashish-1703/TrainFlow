const express = require("express");
const Exercise = require("../models/Exercise");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("FULL REQ BODY:", req.body);
        console.log("NAME:", req.body.name);
        console.log("CATEGORY:", req.body.category);
        console.log("DIFFICULTY:", req.body.difficulty);
        console.log("DURATION:", req.body.duration);
        console.log("INSTRUCTIONS:", req.body.instructions);
        const { name, category, difficulty, duration, instructions } = req.body;

        const exercise = new Exercise({
            name,
            category,
            difficulty,
            duration,
            instructions
        });

        await exercise.save();

        res.status(201).json({
            message: "Exercise created successfully",
            exercise
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;