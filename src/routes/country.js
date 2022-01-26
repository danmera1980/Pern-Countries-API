const {Router} = require("express");

const {getAllCountries, getCountryByID} = require('../controllers/country');

const router = Router();


router.get('/', getAllCountries);
router.get('/:id', getCountryByID);

module.exports = router;