import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation()
  const { accessToken } = useContext(AuthContext)

  const matchingRole = allowedRoles.includes(accessToken?.role)

  useEffect(() => {
    if (!matchingRole) {
      const timeout = setTimeout(() => {
        window.history.back()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [matchingRole])

  if (!matchingRole) {
    return (
      <div className="vh-100 d-flex justify-content-center align-content-center">
        Unauthorized access
      </div>
    )
  }

  return matchingRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
