import React, { useState } from 'react';
import { useLoteStore } from '../store/useLoteStore';
import toast from 'react-hot-toast';

export const LoteForm = ({ closeForm }: { closeForm: () => void }) => {
    const {addLote, lotes} = useLoteStore();
    const [loteId, setLoteId] = useState('');
    const [propietarios, setPropietarios] = useState([{ nombre: '', apellido: '' }]);

    const handleAddPropietario = () => {
        setPropietarios([...propietarios, { nombre: '', apellido: '' }]);
    };

    const handlePropietarioChange = (index: number, field: string, value: string) => {
        const newPropietarios = [...propietarios];
        (newPropietarios[index] as any)[field] = value;
        setPropietarios(newPropietarios);
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDACIÓN LOCAL (Antes de ir al servidor)
    const duplicadoLocal = lotes.find(l => l.loteId.toLowerCase() === loteId.toLowerCase());
    if (duplicadoLocal) {
        return toast.error(`El Lote ${loteId} ya está en la lista.`);
    }

    try {
      // Intentamos crear en el servidor
        await addLote({ loteId, propietarios: [...propietarios] }); 
        toast.success("Lote creado exitosamente");
        setLoteId(""); // Limpiamos el form
        setPropietarios([{ nombre: '', apellido: '' }]);
        closeForm(); // Cerramos el formulario
    } catch (error: any) {
      // Si el backend responde con error (ej. el 400 que configuramos arriba)
        const mensaje = error.response?.data?.message || "Error al crear lote";
        toast.error(mensaje);
    }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Registrar Nuevo Lote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Número de Lote</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Ej: B-25"
                        value={loteId}
                        onChange={(e) => setLoteId(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-600">Propietarios</label>
                    {propietarios.map((p, index) => (
                        <div key={index} className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Nombre"
                                className="w-1/2 p-2 border rounded-lg text-sm"
                                value={p.nombre}
                                onChange={(e) => handlePropietarioChange(index, 'nombre', e.target.value)}
                                required
                            />
                            <input 
                                type="text" 
                                placeholder="Apellido"
                                className="w-1/2 p-2 border rounded-lg text-sm"
                                value={p.apellido}
                                onChange={(e) => handlePropietarioChange(index, 'apellido', e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={handleAddPropietario}
                        className="text-indigo-600 text-sm font-bold hover:underline"
                    >
                        + Agregar otro propietario
                    </button>
                </div>

                <div className="flex gap-3 pt-4">
                    <button 
                        type="button" 
                        onClick={closeForm}
                        className="flex-1 px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                    >
                        Guardar Lote
                    </button>
                </div>
            </form>
        </div>
    );
};