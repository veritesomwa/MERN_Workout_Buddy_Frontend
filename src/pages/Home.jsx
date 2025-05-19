import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutFrom from "../components/WorkoutFrom"
import useAuthContext from "../hooks/useAuthContext"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
  const [workouts, setWorkouts] = useState(null)
  //   const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      const json = await res.json()

      if (res.ok) {
        setWorkouts(json)
        // dispatch({ type: "SET_WORKOUT", payload: json })
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [workouts, user])
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
