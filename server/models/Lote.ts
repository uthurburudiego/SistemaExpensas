import { Schema, model, Document } from 'mongoose';

interface ICanonMes {
  mes: number;          // 1 al 12
  anio: number;         // 2024, 2025, etc.
  montoOriginal: number; // Ej: 1000
  montoDisponible: number; // Lo que va quedando (ej: 500)
  montoGastado: number;    // Lo que ya usó (ej: 500)
}

export interface ILote extends Document {
    loteId: string;
    propietarios: { nombre: string; apellido: string }[];
    canones: ICanonMes[]; // Aquí guardaremos los 6 meses
}

const LoteSchema = new Schema<ILote>({
    loteId: { type: String, required: true, unique: true },
    propietarios: [{
        nombre: { type: String, required: true },
        apellido: { type: String, required: true }
    }],
    canones: [{
        mes: Number,
        anio: Number,
        montoOriginal: { type: Number, default: 1000 },
        montoDisponible: { type: Number, default: 1000 },
        montoGastado: { type: Number, default: 0 }
    }]
}, { timestamps: true });

export default model<ILote>('Lote', LoteSchema);