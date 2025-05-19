// import { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import useAuthContext from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {
  // const [workouts, setWorkouts] = useState(null)
  const { user } = useAuthContext()
  const handleClick = async () => {
    if (!user) {
      return
    }

    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    })
    const json = await res.json()

    if (!res.ok) {
      console.log(json.error)
    }
    if (res.ok) {
      console.log("Delete successful")
    }
  }
  return (
    <div className="workout-details">
      <h4>{workout.name}</h4>
      {+workout.load !== 0 && (
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
      )}
      <p>
        <strong>reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="delete" onClick={handleClick}>
        <i>
          <FaTrashAlt />
        </i>
      </span>
    </div>
  )
}

export default WorkoutDetails
