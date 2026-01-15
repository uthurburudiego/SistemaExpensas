import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export const TicketRestaurante = ({ loteId, saldoTotal, consumirCanon }: any) => {
    const [montoGasto, setMontoGasto] = useState(0);

    const handleConsumo = async () => {
        if (montoGasto <= 0) return toast.error("Ingrese un monto válido");
        if (montoGasto > saldoTotal) return toast.error("Saldo insuficiente");
        try {
        await consumirCanon(loteId, montoGasto);
        toast.success(`Consumo de $${montoGasto} registrado`);
        setMontoGasto(0);
        } catch (error) {
        toast.error("Error al procesar el consumo");
        }
    };
    const isAdmin = useAuthStore(state =>state.isAdmin());

    return (
        <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
        <h4 className="font-bold text-orange-800 mb-4 font-mono uppercase tracking-tight">🍽 Ticket Restaurante</h4>
        <div className="flex gap-3">
            <input 
            type="number"
            className="flex-1 bg-white border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 font-bold text-orange-700"
            placeholder="Monto del ticket..."
            value={montoGasto || ""}
            onChange={(e) => setMontoGasto(Number(e.target.value))}
            />
            {isAdmin &&(
            <button 
            onClick={handleConsumo}
            className="bg-orange-500 text-white px-8 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md active:scale-95"
            >
            Cobrar
            </button>
            )}
        </div>
        </section>
    );
};