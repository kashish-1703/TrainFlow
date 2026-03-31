const express = require("express");
const Workout = require("../models/Workout");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find().populate("exercises");
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, exercises } = req.body;
        
        const workout = new Workout({
            name,
            exercises
        });

        await workout.save();

        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/exercises", async (req, res) => {
    try {
        const { exerciseId } = req.body;

        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        workout.exercises.push(exerciseId);

        await workout.save();

        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);

        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/exercises", async (req, res) => {
    try {
        const { exerciseId } = req.body;

        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }

        workout.exercises.push(exerciseId);
        await workout.save();

        const updatedWorkout = await Workout.findById(req.params.id).populate("exercises");
        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find().populate("exercises");
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;