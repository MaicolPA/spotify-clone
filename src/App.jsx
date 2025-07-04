import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Menu from './components/Menu';
import Register from './components/Register';
import './App.css'

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Menu />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}