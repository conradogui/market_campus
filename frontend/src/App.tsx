import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Anunciar from './pages/Anunciar'
import ProtectedRoute from './components/ProtectedRoute'
import MeusAnuncios from './pages/MeusAnuncios'
import Layout from './components/Layout'



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/anunciar" element={<ProtectedRoute> <Anunciar /> </ProtectedRoute>} />  
      <Route path="/meus" element={<ProtectedRoute> <MeusAnuncios /> </ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
