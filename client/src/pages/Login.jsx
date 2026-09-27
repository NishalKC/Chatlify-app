import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";

const Login = ({setIslogin}) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await api.post("user/login", formData);
      console.log(response);
      setIslogin(true)

      navigate("/"); // Change to your target route
    } catch (err) {
      console.log(err.message);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      setError(errorMsg);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-20 self-center items-center px-10 py-5 text-white min-h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col px-10 py-8 bg-zinc-900 rounded-md gap-1 w-full max-w-md shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-2">Welcome Back!</h1>
        <p className="text-zinc-400 text-center mb-6">Welcome back to Chatlify</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-3 py-2 rounded-md mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <label htmlFor="email" className="text-sm font-medium text-zinc-300 mb-1">Email</label>
        <input 
          id="email" 
          type="text" 
          placeholder="name@example.com" 
          value={formData.email} 
          name="email" 
          onChange={handleChange} 
          required 
          className="bg-zinc-800 outline-none px-1.5 md:px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-4" 
        />

        <label htmlFor="password" className="text-sm font-medium text-zinc-300 mb-1">Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          placeholder="••••••••" 
          value={formData.password} 
          onChange={handleChange} 
          required 
          className="bg-zinc-800 outline-none px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-6" 
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 active:scale-[0.98]">
          Login
        </button>

        <p className="text-center mt-3 text-zinc-400">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
