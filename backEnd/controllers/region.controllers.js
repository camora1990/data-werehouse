const { request, response } = require("express");
const { capitalLetter } = require("../helpers/capital-letter");

const {
  cityEntity,
  countryEntity,
  regionEntity,
} = require("../database/connection.dataBase");


const createRegion = async (req = request, res = response) => {
  const { region, country, cities } = req.body;
  const capitalLetterRegion = capitalLetter(region);
  const capitalLetterCountry = capitalLetter(country);

  const createRegion = await regionEntity.create({
    region: capitalLetterRegion,
  });

  const createCountry = await countryEntity.create({
    country: capitalLetterCountry,
    regionId: createRegion.id,
  });

  const citiesMap = cities.map((el) => ({
    city: capitalLetter(el.city),
    countryId: createCountry.id,
  }));

  const createCities = await cityEntity.bulkCreate(citiesMap);

  res.json({
    region: createRegion,
    country: createCountry,
    cities:createCities
  });
};

module.exports = {
  createRegion,
};
