const axios = require("axios");
const {Country, Activity} = require('../db');

const createActivity = async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;
    try {
        const activity = await Activity.findOrCreate({
           where: {
               name,
               difficulty,
               duration,
               season
           }
        });

        const act = await Activity.findOne({
            where:{
                name
            }
        })

        countries.forEach(c => {
            act.addCountry(c)
        });

        res.status(200).send("Activity Created")
    } catch (e) {
        console.log(e)
    }
};


const getActivitiesByCountryID = async( req, res) => {
    try {
        const {countryID} = req.params
        let country = await Country.findByPk(countryID.toUpperCase(), {
            include: [
                {
                    model: Activity,
                    attributes: [ 'id', 'name', 'difficulty', 'duration','season' ]
                }
            ]
        });
        if(country) {
            res.status(200).send(country);
        } else {
            res.status(404).send('No se encuentra país con ese código.')
        }

    } catch (e) {
        console.log(e)
    }
}


const getAllActivities = async (req, res) => {
    try {
        const allActivities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ['id', 'name']
            }
        });

        res.status(200).send(allActivities)
    } catch (e) {
        console.log(e)
    }
};

const deleteCountry_Activity = async (req, res) => {
    try {
        
    } catch (e) {
        
    }
};


module.exports = {
    createActivity,
    getAllActivities,
    getActivitiesByCountryID,
    deleteCountry_Activity
}