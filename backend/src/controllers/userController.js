const pool = require("../model/db");
const axios = require('axios');

const getUser = async (req, res) => {
    try {
        const email = req.params.email

        const userQuery = await pool.query("SELECT * FROM zti_project.user WHERE email=$1",[email]);

        if(userQuery)
        {
          res.json(userQuery.rows);
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getAllUsers =  async (req, res) => {
    await pool.query("SELECT * FROM zti_project.user", (error, results) => {
        if (error) {
            res.status(500).json("{ 'Error': error }");
        } else {
            res.status(200).json(results.rows);
        }
    });
}

const createNewUser = async (req, res) => {
    try {
        const { firstName,lastName,email,password,image,flightIds } = req.body;

        if ( !firstName || !lastName || !email || !password || !image || !flightIds )  {
            return res.status(400).json({ 'Message': 'First Name, Last Name, Email, Password, Image and Flights Ids are required.' });
        }

        await pool.query("INSERT INTO zti_project.user (firstName,lastName,email,password,image,flightIds) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[firstName,lastName,email,password,image,flightIds], (error, results) => {
            if (error) {
                res.status(500).json({ 'Error': error });
            } else {
                res.status(200).json({ 'Message': 'User added' });
            }
        });

    }catch (err) {
        res.status(500).json(err.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = req.body;

        if ( !user.firstName && !user.lastName && !user.indexNumber && !user.email && !user.password && !user.image && !user.flightIds )  {
            return res.status(400).json({ 'Message': 'First Name, Last Name, Email, Password, Image and Flights Ids are required.' });
        }

        await pool.query("UPDATE zti_project.user SET firstName = $1, lastName= $2, password=$4, image=$5, flightIds = $6 WHERE email = $3 RETURNING *",[user.firstName,user.lastName,user.email,user.password,user.image, user.flightIds], (error, results) => {
            if (error) {
                res.status(500).json({ 'Error': error });
            } else {
                res.status(200).json({ 'Message': 'User updated' });
            }
        });
    
    }catch (err) {
        res.status(500).json(err.message);
    }
}

const deleteUser = (req, res) => {
    try {
        const email = req.params.email

        pool.query("DELETE FROM zti_project.user WHERE email=$1",[email], (error, results) => {
            if (error) {
                res.status(500).json({ 'Error': error });
            } else {
                res.status(200).json({ 'Message': 'User deleted' });
            }
        });

    }catch (err) {
        res.status(500).json(err.message);
    }
}

const getUserFlightsHistory = async (req, res) => {
    try {
        const { email } = req.params;

        const userQuery = await pool.query('SELECT flightIds FROM zti_project.user WHERE email = $1', [email]);
        const flightIds = userQuery.rows[0].flightids;

        const response = await axios.post('http://localhost:3000/flight/flights_by_ids', { flightIds });
        
        res.json(response.data);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const makeReservation = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(' ')[1];
        const { email, flightId } = req.body;

        pool.query('UPDATE zti_project.user SET flightIds = array_append(flightIds, $1) WHERE email = $2', [flightId, email])

        const flights = await axios.post('http://localhost:3000/flight/flights_by_ids', { "flightIds": [flightId]});

        await axios.put('http://localhost:3000/flight', { flightId, "freeSeats": flights.data[0].freeSeats-1 }, { headers: { Authorization: `Bearer ${token}`}});

        res.status(200).json({ 'Message': 'Reservation made' });
    }catch (err) {
        res.status(500).json(err.message);
    }
};

const cancelReservation = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(' ')[1];
        const { email, flightId } = req.body;

        pool.query('UPDATE zti_project.user SET flightIds = array_remove(flightIds, $1) WHERE email = $2', [flightId, email])

        const flights = await axios.post('http://localhost:3000/flight/flights_by_ids', { "flightIds": [flightId] });

        await axios.put('http://localhost:3000/flight', { flightId, "freeSeats": flights.data[0].freeSeats+1 }, { headers: { Authorization: `Bearer ${token}`}});

        res.status(200).json({ 'Message': 'Reservation cancelled' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};


module.exports = {
    getUser,
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUserFlightsHistory,
    makeReservation,
    cancelReservation,
}