"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LoteSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Lote', LoteSchema);
