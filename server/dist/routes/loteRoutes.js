"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loteController_1 = require("../controllers/loteController");
const router = (0, express_1.Router)();
router.post('/', loteController_1.createLote);
router.get('/', loteController_1.getLotes);
// Nueva ruta para el pago
router.post('/pagar-expensa', loteController_1.pagarExpensa);
// Nueva ruta para consumir canon
router.post('/consumir-canon', loteController_1.consumirCanon);
//Borrar lote (opcional)
router.delete('/:id', loteController_1.deleteLote);
//Borrar canon (opcional)
router.delete('/:loteId/canon/:canonId', loteController_1.deleteCanon);
// Actualizar propietarios de un lote
router.put('/:id/propietarios', loteController_1.updateLotePropietarios);
exports.default = router;
