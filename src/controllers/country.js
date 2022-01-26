const axios = require("axios");
const {Country, Activity} = require('../db');

const dbLoad = async (next) => {
    const apiInfo = await axios.get('https://restcountries.com/v3.1/all');
    
    try{
        const allData = await apiInfo.data.map(c => {
            // console.log(c.capital[0]);
            Country.findOrCreate({
                where: {
                    id: c.cca3,
                    name: c.name.official,
                    imageUrl: c.flags.svg,
                    continent: c.region,
                    capital: c.capital?c.capital[0]:"",
                    subregion: c.subregion?c.subregion:"",
                    area: c.area,
                    population: c.population
                }
            });
        });
    }
    catch(e){
        next(e);
    }
};

dbLoad();


const getAllCountries = async (req, res, next) => {
    try {
        const allCountries = await Country.findAll({
            include: Activity
        })
    
        const name = req.query.name;
        if(name){
            let country = await allCountries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
            country.length ? res.status(200).send(country) : res.status(404).send('No se encuentra ese país!');
        } else {
            res.status(200).send(allCountries);
        }
        
    } 
    catch (e) {
        next(e)
    }
};


const getCountryByID = async (req, res) => {
    try {
        const {id} = req.params
        let country = await Country.findByPk(id.toUpperCase());
        if(country) {
            res.status(200).send(country);
        } else {
            res.status(404).send('No se encuentra país con ese código.')
        }
    } catch (e) {
        next(e)
    }
};

module.exports = {
    getAllCountries,
    getCountryByID
}
