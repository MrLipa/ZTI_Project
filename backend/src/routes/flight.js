const {Router} = require('express')
const router = Router()
const flightController = require('../controllers/flightController');

router.post('/flights_from', flightController.findFlightsFrom)
router.post('/flights_to', flightController.findFlightsTo)
router.post('/flights_by_ids', flightController.getFlightsByIds)
router.get('/', flightController.getAllFlights)
router.put('/', flightController.updateFlight)

module.exports = router;