const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getAllUsers)
router.get('/:user_id', userController.getUser)
router.post('/', userController.createNewUser)
router.put('/', userController.updateUser)
router.delete('/:user_id', userController.deleteUser)
router.get('/flights_history/:user_id', userController.getUserFlightsHistory)
router.post('/made_reservation', userController.makeReservation)
router.post('/cancel_reservation', userController.cancelReservation)

module.exports = router;