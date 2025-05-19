import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // Perform logout logic here
    // Remove user data from local storage or cookies
    localStorage.removeItem("user")
    // dispatch logout
    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}

export default useLogout
