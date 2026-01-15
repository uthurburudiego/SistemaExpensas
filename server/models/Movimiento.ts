import { Schema, model, Document, Types } from 'mongoose';

export interface IMovimiento extends Document {
    lote: Types.ObjectId; // Referencia al lote
    tipo: 'ingreso' | 'consumo' | 'ajuste'; // ingreso (mensual), consumo (restaurante), ajuste (manual)
    monto: number;
    fecha: Date;
    mesReferencia?: string; // Ejemplo: "Enero 2024"
    descripcion: string;
}

const MovimientoSchema = new Schema<IMovimiento>({
    lote: { type: Schema.Types.ObjectId, ref: 'Lote', required: true },
    tipo: { type: String, enum: ['ingreso', 'consumo', 'ajuste'], required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    mesReferencia: { type: String },
    descripcion: { type: String }
});

export default model<IMovimiento>('Movimiento', MovimientoSchema);