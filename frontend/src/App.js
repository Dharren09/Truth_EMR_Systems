import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Service from './pages/Service'
import Appointment from './pages/Appointment'
import LoginForm from './pages/Login'
import SignupForm from './pages/Signup'


function App() {
  const { auth_user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={auth_user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth_user ? <LoginForm /> : <Navigate to="/" />}  />
            <Route path="/signup" element={!auth_user ? <SignupForm /> : <Navigate to="/" />} />
            <Route path="/services" element={<Service/>} />
            <Route path="/appointments" element={<Appointment/>} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App; 