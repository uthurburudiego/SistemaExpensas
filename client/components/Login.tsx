import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginStore = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      loginStore(res.data);
      toast.success("¡Bienvenido!");
    } catch (error) {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
        <h2 className="text-3xl font-black text-slate-800 mb-6">Iniciar Sesión</h2>
        <div className="space-y-4">
          <input 
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Usuario"
            onChange={e => setUsername(e.target.value)}
          />
          <input 
            type="password"
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contraseña"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all"
          type="submit">
            Entrar al Sistema
          </button>
        </div>
      </form>
    </div>
  );
};