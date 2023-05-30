import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const decodeAccessToken = (accessToken) => {
    const decodedToken = jwtDecode(accessToken)

    return {
      token: accessToken,
      role: decodedToken.role,
      email: decodedToken.email,
      fullName: decodedToken.fullName,
    }
  }

  const [accessToken, setAccessToken] = useState(() => {
    const storedAccessToken = localStorage.getItem('accessToken')
    return storedAccessToken ? decodeAccessToken(storedAccessToken) : null
  })

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken.token)
    } else {
      localStorage.removeItem('accessToken')
    }
  }, [accessToken])

  const login = (token) => {
    setAccessToken(decodeAccessToken(token))
  }

  const logout = () => {
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
