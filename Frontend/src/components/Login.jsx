import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/products'); 
       console.log(res);
       // Redirect to /products after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}  {/* Error message */}

        <input 
          type="email" 
          placeholder="Email" 
          className="input mb-4 w-full bg-slate-300" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <input 
          type="password" 
          placeholder="Password" 
          className="input mb-4 w-full bg-slate-300" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          autoComplete="current-password" 
        />

        <button 
          type="submit" 
          className="btn btn-primary w-full"
        >
          Login
        </button>

        <p className="mt-2">
          New User? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
}
