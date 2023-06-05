import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation()
  const { accessToken } = useContext(AuthContext)

  const matchingRole = allowedRoles.includes(accessToken?.role ?? null)

  useEffect(() => {
    if (accessToken && !matchingRole) {
      const timeout = setTimeout(() => {
        window.history.back()
      }, 2500)

      return () => clearTimeout(timeout)
    }
  }, [accessToken, matchingRole])

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
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
