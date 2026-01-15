"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLotePropietarios = exports.deleteCanon = exports.deleteLote = exports.consumirCanon = exports.pagarExpensa = exports.getLotes = exports.createLote = void 0;
const Lote_1 = __importDefault(require("../models/Lote"));
// @desc    Crear un nuevo lote
// @route   POST /api/lotes
const createLote = async (req, res) => {
    try {
        const { loteId, propietarios } = req.body;
        // Verificar si el lote ya existe
        const existeLote = await Lote_1.default.findOne({ loteId: { $regex: new RegExp(`^${loteId}$`, 'i') } });
        if (existeLote) {
            return res.status(400).json({ message: `El Lote ${loteId} ya existe en el sistema.` });
        }
        const nuevoLote = new Lote_1.default({
            loteId,
            propietarios,
            canones: [] // Inicia vacío hasta que pague la primera expensa
        });
        const loteGuardado = await nuevoLote.save();
        res.status(201).json(loteGuardado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el lote', error });
    }
};
exports.createLote = createLote;
// @desc    Obtener todos los lotes
// @route   GET /api/lotes
const getLotes = async (_req, res) => {
    try {
        const lotes = await Lote_1.default.find();
        res.json(lotes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los lotes' });
    }
};
exports.getLotes = getLotes;
// @desc    Pagar expensa de un lote
// @route   POST /api/lotes/pagar-expensa
const pagarExpensa = async (req, res) => {
    try {
        const { loteId, mes, anio, monto } = req.body;
        const lote = await Lote_1.default.findOne({ loteId: { $regex: new RegExp(`^${loteId}$`, 'i') } });
        if (!lote)
            return res.status(404).json({ message: 'Lote no encontrado' });
        // 1. Agregamos el nuevo canon
        lote.canones.push({
            mes: Number(mes),
            anio: Number(anio),
            montoOriginal: Number(monto),
            montoDisponible: Number(monto),
            montoGastado: 0
        });
        // 2. Ordenamos el array cronológicamente antes de verificar el límite
        // Esto garantiza que el elemento en el índice [0] sea siempre el más antiguo real
        lote.canones.sort((a, b) => {
            if (a.anio !== b.anio)
                return a.anio - b.anio;
            return a.mes - b.mes;
        });
        // 3. Si hay más de 6, eliminamos el primero (que es el más viejo tras el sort)
        if (lote.canones.length > 6) {
            lote.canones.shift();
        }
        await lote.save();
        res.status(200).json({ lote });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al procesar pago' });
    }
};
exports.pagarExpensa = pagarExpensa;
// @desc    Consumir monto del canon de un lote
// @route   POST /api/lotes/consumir-canon
const consumirCanon = async (req, res) => {
    try {
        const { loteId, montoAGastar } = req.body; // montoAGastar es el total del ticket del restaurant
        const lote = await Lote_1.default.findOne({ loteId: loteId });
        if (!lote)
            return res.status(404).json({ message: 'Lote no encontrado' });
        // 1. Calcular saldo total disponible sumando todos los meses
        const saldoTotal = lote.canones.reduce((acc, c) => acc + c.montoDisponible, 0);
        if (saldoTotal < montoAGastar) {
            return res.status(400).json({ message: 'Saldo insuficiente en el Canon' });
        }
        // 2. Proceso de descuento (Lógica de cascada)
        let restantePorPagar = montoAGastar;
        for (let canon of lote.canones) {
            if (restantePorPagar <= 0)
                break; // Ya cubrimos la deuda
            if (canon.montoDisponible > 0) {
                if (canon.montoDisponible >= restantePorPagar) {
                    // Este mes cubre todo lo que falta
                    canon.montoDisponible -= restantePorPagar;
                    canon.montoGastado += restantePorPagar;
                    restantePorPagar = 0;
                }
                else {
                    // Este mes no alcanza, lo dejamos en 0 y seguimos con el siguiente
                    restantePorPagar -= canon.montoDisponible;
                    canon.montoGastado += canon.montoDisponible;
                    canon.montoDisponible = 0;
                }
            }
        }
        await lote.save();
        res.json({ message: 'Consumo registrado con éxito', lote });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al procesar el consumo', error });
    }
};
exports.consumirCanon = consumirCanon;
const deleteLote = async (req, res) => {
    try {
        const { id } = req.params; // Usaremos el _id de MongoDB
        const lote = await Lote_1.default.findByIdAndDelete(id);
        if (!lote)
            return res.status(404).json({ message: 'Lote no encontrado' });
        res.json({ message: 'Lote eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
};
exports.deleteLote = deleteLote;
const deleteCanon = async (req, res) => {
    try {
        const { loteId, canonId } = req.params; // Necesitamos el ID del lote y el ID del canon (mes)
        const lote = await Lote_1.default.findById(loteId);
        if (!lote)
            return res.status(404).json({ message: "Lote no encontrado" });
        // Filtramos el array para quitar el canon específico
        lote.canones = lote.canones.filter((c) => c._id.toString() !== canonId);
        await lote.save();
        res.json({ message: "Canon eliminado", lote });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar canon" });
    }
};
exports.deleteCanon = deleteCanon;
const updateLotePropietarios = async (req, res) => {
    try {
        const { id } = req.params;
        const { propietarios } = req.body;
        const lote = await Lote_1.default.findByIdAndUpdate(id, { propietarios }, { new: true } // Para que devuelva el lote ya actualizado
        );
        if (!lote)
            return res.status(404).json({ message: "Lote no encontrado" });
        res.json({ lote });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar propietarios" });
    }
};
exports.updateLotePropietarios = updateLotePropietarios;
