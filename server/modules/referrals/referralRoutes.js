import e from 'express'
import { createReferral, deleteReferral, getAllReferrals, getReferralById, updateReferral } from './referralController.js'

const router = e.Router()

// Rutas
router.get('/', getAllReferrals)
router.get('/:id', getReferralById)
router.post('/', createReferral)
router.delete('/:id', deleteReferral)
router.patch('/:id', updateReferral)

export default router
