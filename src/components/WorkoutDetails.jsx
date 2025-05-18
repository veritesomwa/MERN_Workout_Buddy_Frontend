import { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
  // eslint-disable-next-line
  const [workouts, setWorkouts] = useState(null)
  const handleClick = async () => {
    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
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
