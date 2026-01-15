import { Router } from 'express';
import { createLote, getLotes, pagarExpensa, consumirCanon, 
        deleteLote, deleteCanon, updateLotePropietarios } from '../controllers/loteController';

const router = Router();

router.post('/', createLote);
router.get('/', getLotes);

// Nueva ruta para el pago
router.post('/pagar-expensa', pagarExpensa);

// Nueva ruta para consumir canon
router.post('/consumir-canon', consumirCanon);

//Borrar lote (opcional)
router.delete('/:id', deleteLote);

//Borrar canon (opcional)
router.delete('/:loteId/canon/:canonId', deleteCanon);

// Actualizar propietarios de un lote
router.put('/:id/propietarios', updateLotePropietarios);

export default router;