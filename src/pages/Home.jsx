import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutFrom from "../components/WorkoutFrom"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  //   const { workouts, dispatch } = useWorkoutsContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts")
      const json = await res.json()

      if (res.ok) {
        setWorkouts(json)
        // dispatch({ type: "SET_WORKOUT", payload: json })
      }
    }
    fetchWorkouts()
  }, [workouts])
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutFrom />
    </div>
  )
}

export default Home
