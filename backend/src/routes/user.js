const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers)
router.get('/:email', userController.getUser)
router.post('/', userController.createNewUser)
router.put('/', userController.updateUser)
router.delete('/:email', userController.deleteUser)
router.get('/flights_history/:email', userController.getUserFlightsHistory)
router.post('/made_reservation', userController.makeReservation)
router.post('/cancel_reservation', userController.cancelReservation)

module.exports = router;