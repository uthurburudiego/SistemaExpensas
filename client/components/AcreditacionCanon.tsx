import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export const AcreditacionCanon = ({ loteId, pagarExpensa }: any) => {
    const [montoAcreditar, setMontoAcreditar] = useState(1000);
    const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth() + 1);
    const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear());

    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const aniosDisponibles = [2024, 2025, 2026];

    const isAdmin = useAuthStore(state => state.isAdmin());

    return (
        <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <h4 className="font-bold text-indigo-800 mb-4">Acreditación de Canon Manual</h4>
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
            <select 
                className="bg-white border border-indigo-200 rounded-xl px-2 py-3 text-sm font-bold text-indigo-600"
                value={mesSeleccionado}
                onChange={(e) => setMesSeleccionado(Number(e.target.value))}
            >
                {mesesNombres.map((nombre, index) => <option key={index} value={index + 1}>{nombre}</option>)}
            </select>
            <select 
                className="bg-white border border-indigo-200 rounded-xl px-2 py-3 text-sm font-bold text-indigo-600"
                value={anioSeleccionado} 
                onChange={(e) => setAnioSeleccionado(Number(e.target.value))}
            >
                {aniosDisponibles.map(anio => <option key={anio} value={anio}>{anio}</option>)}
            </select>
            <input 
                type="number"
                className="bg-white border border-indigo-200 rounded-xl px-2 py-3 text-sm font-bold text-indigo-600"
                value={montoAcreditar}
                onChange={(e) => setMontoAcreditar(Number(e.target.value))}
            />
            </div>
            {isAdmin &&(
            <button 
            onClick={() => {
                pagarExpensa(loteId, mesSeleccionado, anioSeleccionado, montoAcreditar);
                toast.success("Pago acreditado");
            }}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
            Confirmar Pago
            </button>
            )}
        </div>
        </section>
    );
};