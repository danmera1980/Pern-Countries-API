const { Router } = require('express');
const axios = require('axios');
// const {Country, Activity} = require('../db'); //put in controller
const Country = require('./country');
const Activity = require('./activity');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', Country);
router.use('/activities', Activity);




module.exports = router;
