import e from 'express'
import { createReferral, deleteReferral, getAllFinishedReferrals, getAllInProgressReferrals, getAllPendingReferrals, getAllReferrals, getReferralById, updateReferral } from './referralController.js'

const router = e.Router()

// Rutas
router.get('/', getAllReferrals)
router.get('/pendings', getAllPendingReferrals)
router.get('/in-progress', getAllInProgressReferrals)
router.get('/finished', getAllFinishedReferrals)
router.get('/:id', getReferralById)
router.post('/', createReferral)
router.delete('/:id', deleteReferral)
router.patch('/:id', updateReferral)

export default router
