export const LoteMiniCard = ({ lote, isSelected, onSelect }: any) => {
    const saldoTotal = lote.canones.reduce((acc: number, curr: any) => acc + curr.montoDisponible, 0);

    return (
        <div 
        onClick={onSelect}
        className={`p-4 rounded-xl border cursor-pointer transition-all ${
            isSelected 
            ? 'bg-indigo-50 border-indigo-500 shadow-md translate-x-2' 
            : 'bg-white border-slate-200 hover:border-indigo-300'
        }`}
        >
        <div className="flex justify-between items-center">
            <div>
            <h3 className="text-lg font-bold text-slate-800">Lote {lote.loteId}</h3>
            <p className="text-xs text-slate-500">
                {lote.canones.length} meses activos
            </p>
            </div>
            <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">Saldo</p>
            <p className={`text-lg font-black ${saldoTotal > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                ${saldoTotal}
            </p>
            </div>
        </div>
        </div>
    );
    };