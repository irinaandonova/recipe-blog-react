import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { AuthContextProvider } from './context/authContext';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
