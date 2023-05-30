import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Roles } from './utils/roles'
import LoginRegisterPage from './pages/LoginRegisterPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import UsersPage from './pages/UsersPage'
import ZookeepersPage from './pages/ZookeepersPage'
import AnimalsPage from './pages/AnimalsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={[Roles.user, Roles.owner, Roles.zookeeper]}
              />
            }
          >
            <Route path="/" element={<HomePage />} exact />
            <Route path="/About" element={<AboutPage />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[Roles.owner]} />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/Zookeepers" element={<ZookeepersPage />} />
            <Route path="/Animals" element={<AnimalsPage />} />
          </Route>

          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="*" element={<div>Page not Found!</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
