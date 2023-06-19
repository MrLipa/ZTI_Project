const neo4j = require('neo4j-driver');
const { NEO4J_DATABASE_URL, NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD} = process.env
const driver = neo4j.driver(NEO4J_DATABASE_URL, neo4j.auth.basic(NEO4J_DB_USERNAME, NEO4J_DB_PASSWORD));
const session = driver.session();
require('dotenv').config()



const findFlights = async(req, res) => {
    try {
        const city_from = req.query.city_from;
        const city_to = req.query.city_to;
        
        let query = '';
        let parameters = {};

        if (city_from==='' && city_to==='') {
            query = 'MATCH (a:Airport)-[r:Flight]-(b:Airport) RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats';
        } 
        else if (city_from && city_to==='') {
            query = 'MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE a.city = $city_from RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats';
            parameters = { city_from: city_from };
        }
        else if (city_from==='' && city_to) {
            query = 'MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats';
            parameters = { city_to: city_to };
        }
        else {
            query = 'MATCH (a:Airport)-[r:Flight]-(b:Airport) WHERE a.city = $city_from AND b.city = $city_to RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats';
            parameters = { city_from: city_from, city_to: city_to };
        }
        
        const result = await session.run(query, parameters);

        const flights = result.records.map((record) => ({
            id: record.get('id').low,
            originCountry: record.get('originCountry'),
            originCity: record.get('originCity'),
            originImage: record.get('a.image'),
            destinationCountry: record.get('destinationCountry'),
            destinationCity: record.get('destinationCity'),
            destinationImage: record.get('b.image'),
            distance: record.get('r.distance').low,
            date: record.get('r.date'),
            price: record.get('r.price').low,
            duration: record.get('r.duration'),
            airlines: record.get('r.airlines'),
            class: record.get('r.class'),
            freeSeats: record.get('r.freeSeats').low,
        }));

        res.status(200).json(flights);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getFlightsByIds = async (req, res) => {
    try {
        const { flightIds } = req.body;

        const result = await session.run('MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE ID(r) IN $flightIds RETURN ID(r) as id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats', { flightIds: flightIds });

        const flights = result.records.map((record) => ({
            id: record.get('id').low,
            originCountry: record.get('originCountry'),
            originCity: record.get('originCity'),
            originImage: record.get('a.image'),
            destinationCountry: record.get('destinationCountry'),
            destinationCity: record.get('destinationCity'),
            destinationImage: record.get('b.image'),
            distance: record.get('r.distance').low,
            date: record.get('r.date'),
            price: record.get('r.price').low,
            duration: record.get('r.duration'),
            airlines: record.get('r.airlines'),
            class: record.get('r.class'),
            freeSeats: record.get('r.freeSeats').low,
        }));

        res.status(200).json(flights);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getAllFlights = async (req, res) => {
    try {
        const result = await session.run(`MATCH (a:Airport)-[r:Flight]->(b:Airport) RETURN ID(r) AS id, a.country AS originCountry, a.city AS originCity, a.image, b.country AS destinationCountry, b.city AS destinationCity, b.image, r.distance, r.date, r.price, r.duration, r.airlines, r.class, r.freeSeats`);

        const flights = result.records.map((record) => ({
            id: record.get('id').low,
            originCountry: record.get('originCountry'),
            originCity: record.get('originCity'),
            originImage: record.get('a.image'),
            destinationCountry: record.get('destinationCountry'),
            destinationCity: record.get('destinationCity'),
            destinationImage: record.get('b.image'),
            distance: record.get('r.distance').low,
            date: record.get('r.date'),
            price: record.get('r.price').low,
            duration: record.get('r.duration'),
            airlines: record.get('r.airlines'),
            class: record.get('r.class'),
            freeSeats: record.get('r.freeSeats').low,
        }));

        res.status(200).json(flights);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updateFlight = async (req, res) => {
    try {
        const { flightId, ...flightParams } = req.body;

        let cypherQuery = 'MATCH (a:Airport)-[r:Flight]->(b:Airport) WHERE id(r) = $flightId SET ';
        const params = { flightId };

        Object.entries(flightParams).forEach(([key, value], index) => {
        if (Number.isInteger(value)) {
            cypherQuery += `r.${key} = toInteger($param${index}), `;
        } else {
            cypherQuery += `r.${key} = $param${index}, `;
        }
        params[`param${index}`] = value;
        });

        cypherQuery = cypherQuery.slice(0, -2);
        cypherQuery += ' RETURN r';

        await session.run(cypherQuery,params);

        res.status(200).json({ 'Message': 'Flight updated' });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};



module.exports = {
    findFlights,
    getFlightsByIds,
    getAllFlights,
    updateFlight,
}
   