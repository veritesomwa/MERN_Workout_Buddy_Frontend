import { createContext, useReducer } from "react"

export const WorkoutsContext = createContext()

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload }
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workout: null })
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}
