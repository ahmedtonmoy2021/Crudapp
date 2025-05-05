import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProductApp from './ProductApp.jsx';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/products" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/products"
        element={token ? <ProductApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
