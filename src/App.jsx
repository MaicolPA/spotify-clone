import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css'

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Menu />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
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