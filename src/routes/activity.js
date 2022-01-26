const {Router} = require("express");
const {getActivitiesByCountryID, getAllActivities, deleteCountry_Activity, createActivity } = require('../controllers/activity');

const router = Router();

router.get('/', getAllActivities);
router.get('/:countryID', getActivitiesByCountryID);
router.post('/', createActivity);
// router.delete('/', deleteCountry_Activity);

module.exports = router;