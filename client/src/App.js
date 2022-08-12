import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/auth/register' element={<Register />} />
    </Routes>
  )
}

export default App;
