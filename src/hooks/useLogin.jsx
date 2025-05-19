import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const res = await fetch("/api/user/login", {
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
  return { login, isLoading, error }
}

export default useLogin
