import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const HeaderLote = ({ lote, deleteLote, updatePropietarios, saldoTotal }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editPropietarios, setEditPropietarios] = useState(lote.propietarios);

    // Sincronizar estado local cuando cambia el lote seleccionado
    useEffect(() => {
        setEditPropietarios(lote.propietarios);
        setIsEditing(false);
    }, [lote]);

    const handleSavePropietarios = async () => {
        try {
            await updatePropietarios(lote._id, editPropietarios);
            setIsEditing(false);
        } catch (error) {
            toast.error("Error al guardar cambios");
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de eliminar el Lote ${lote.loteId}?`)) {
            try {
                await deleteLote(lote._id);
                toast.success("Lote eliminado");
            } catch (e) {
                toast.error("No se pudo eliminar");
            }
        }
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const newProps = [...editPropietarios];
        newProps[index] = { ...newProps[index], [field]: value };
        setEditPropietarios(newProps);
    };


    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">LOTE ACTIVO</span>
                <h2 className="text-5xl font-black text-slate-900 mt-2">{lote.loteId}</h2>
                
                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Propietarios</p>
                        
                        {!isEditing ? (
                            <>
                            {}
                                <button onClick={() => setIsEditing(true)} className="text-indigo-500 hover:text-indigo-700 text-xs font-bold">
                                    ✎ Editar
                                </button>
                                <button onClick={handleDelete} className="text-red-400 hover:text-red-600 text-xs font-bold">
                                    🗑 Eliminar Lote
                                </button>
                            </>
                        ) : (
                            <button onClick={handleSavePropietarios} className="text-green-600 hover:text-green-700 text-xs font-bold">
                                💾 Guardar
                            </button>
                        )}
                    </div>

                    {!isEditing ? (
                        <p className="text-slate-600 font-medium">
                            {lote.propietarios.map((p: any) => `${p.nombre} ${p.apellido}`).join(', ')}
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {editPropietarios.map((p: any, i: number) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={p.nombre}
                                        onChange={(e) => handleInputChange(i, 'nombre', e.target.value)}
                                        placeholder="Nombre"
                                    />
                                    <input 
                                        className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={p.apellido}
                                        onChange={(e) => handleInputChange(i, 'apellido', e.target.value)}
                                        placeholder="Apellido"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-slate-400 uppercase">Saldo Acumulado</p>
                <p className="text-4xl font-black text-green-600">${saldoTotal}</p>
            </div>
        </div>
    );
};