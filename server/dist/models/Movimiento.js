"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovimientoSchema = new mongoose_1.Schema({
    lote: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lote', required: true },
    tipo: { type: String, enum: ['ingreso', 'consumo', 'ajuste'], required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    mesReferencia: { type: String },
    descripcion: { type: String }
});
exports.default = (0, mongoose_1.model)('Movimiento', MovimientoSchema);
