const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    // .find({}) gets all, .sort({createdAt: -1}) sorts by createdAt in descending order
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    // Checks if id is valid for mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create a workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // Checks if id is valid for mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // Finds id in db which is _id
    const workout = await Workout.findByIdAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    // res.status(200).json({message: 'Workout deleted'})
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json({message: 'Workout updated'})
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}