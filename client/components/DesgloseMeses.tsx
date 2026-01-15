import React from 'react';

export const DesgloseMeses = ({ canones, deleteCanon, loteId }: any) => {
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const canonesOrdenados = [...canones].sort((a, b) => {
        if (a.anio !== b.anio) return a.anio - b.anio;
        return a.mes - b.mes;
    });

    return (
        <section>
        <h4 className="font-bold text-slate-700 mb-4">Desglose de meses disponibles</h4>
        <div className="space-y-3">
            {canonesOrdenados.length === 0 ? (
            <p className="text-slate-400 italic text-sm text-center py-4 bg-slate-50 border-dashed border-2 border-slate-200 rounded-xl">Sin cánones activos.</p>
            ) : (
            canonesOrdenados.map((c: any, i: number) => (
                <div key={i} className="flex justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-indigo-200 transition-colors">
                <span className="font-bold text-slate-600">{mesesNombres[c.mes-1]} {c.anio}</span>
                <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-indigo-600">${c.montoDisponible}</span>
                    <button onClick={() => deleteCanon(loteId, c._id)} className="text-red-300 hover:text-red-500">✕</button>
                </div>
                </div>
            ))
            )}
        </div>
        </section>
    );
};