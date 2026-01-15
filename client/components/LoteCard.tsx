import React, { useState } from 'react';
import { useLoteStore } from '../store/useLoteStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { TicketRestaurante } from './TicketRestaurante';
import { AcreditacionCanon } from './AcreditacionCanon';
import { DesgloseMeses } from './DesgloseMeses';
import { HeaderLote } from './HeaderLote';

export const LoteCard = ({ lote }: { lote: any }) => {
    const { pagarExpensa, consumirCanon, deleteLote, deleteCanon, updatePropietarios } = useLoteStore();

    //Estados  para la edicion
    const [isEditing, setIsEditing]= useState(false);
    const [editPropietarios, setEditPropietarios] = useState(lote.propietarios);

    //Actualiza el estado local si cambiamos de lote seleccionado 
    useEffect(() => {
        setEditPropietarios(lote.propietarios);
        setIsEditing(false);
    }, [lote]);


    // Calcular saldo total disponible
    const saldoTotal = lote.canones.reduce((acc: number, curr: any) => acc + curr.montoDisponible, 0);


    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 h-full overflow-y-auto animate-in fade-in slide-in-from-right-4">
            
        <HeaderLote 
                lote={lote} 
                deleteLote={deleteLote} 
                updatePropietarios={updatePropietarios} 
                saldoTotal={saldoTotal} 
            />

            <div className="grid grid-cols-1 gap-6">
                
                <div className="grid grid-cols-1 gap-6 mt-8">
        <TicketRestaurante 
            loteId={lote.loteId} 
            saldoTotal={saldoTotal} 
            consumirCanon={consumirCanon} 
        />
        
        <AcreditacionCanon 
            loteId={lote.loteId} 
            pagarExpensa={pagarExpensa} 
        />
        
        <DesgloseMeses 
            loteId={lote._id} 
            canones={lote.canones} 
            deleteCanon={deleteCanon} 
        />
            </div>
        </div>
    </div>
    );
};