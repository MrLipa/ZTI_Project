const {Router} = require('express')
const router = Router()
const flightController = require('../../controllers/flightController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.post('/flights_from', flightController.findFlightsFrom)
router.post('/flights_to', flightController.findFlightsTo)
router.post('/flights_by_ids', flightController.getFlightsByIds)
router.get('/', flightController.getAllFlights)
router.put('/', verifyRoles(ROLES_LIST.Admin), flightController.updateFlight)

module.exports = router;