import { WorkoutsContext } from '../context/WorkoutContext.js'
import { useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error("useWorkoutsContext must be used within a WorkoutsContextProvider")
    }

    return context
}