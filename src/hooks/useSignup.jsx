import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const json = await res.json()
    if (!res.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (res.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // update the auth context
      dispatch({ type: "LOGIN", payload: json })

      setIsLoading(false)
    }
  }
  return { signup, isLoading, error }
}

export default useSignup
