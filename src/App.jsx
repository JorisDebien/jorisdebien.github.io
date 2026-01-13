import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CareerPage from './pages/CareerPage'
import SkillsPage from './pages/SkillsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Routes>
    </Router>
  )
}

export default App
