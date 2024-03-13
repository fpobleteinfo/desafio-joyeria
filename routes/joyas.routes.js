import express from 'express';
import { getInventarioOrderLimit,getInventarioFilter, getJoyaId } from '../src/controllers/joyas.controller.js';
const router = express.Router();


router.get('/joyas', getInventarioOrderLimit)
router.get('/joyas/joya/:id', getJoyaId)
router.get('/joyas/filtros', getInventarioFilter)



export default router