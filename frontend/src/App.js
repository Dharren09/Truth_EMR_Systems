import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Service from './pages/Service'
import Appointment from './pages/Appointment'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/services" element={<Service/>} />
            <Route path="/appointments" element={<Appointment/>} />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App; 