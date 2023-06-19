const pool = require("../model/db");
const axios = require('axios');



const getUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const userQuery = await pool.query("SELECT * FROM zti_project.user WHERE user_id=$1", [user_id]);

        if (userQuery.rows.length > 0) {
            const user = userQuery.rows[0];
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
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
        const { firstName, lastName, email, password, phone, address, image, description, messages, flightIds } = req.body;
        
        if (!firstName || !lastName || !email || !password || !phone || !address || !image || !messages || !flightIds) {
            return res.status(400).json({ 'Message': 'First Name, Last Name, Email, Password, Phone, Address, Image, Messages and Flights Ids are required.' });
        }

        await pool.query(
            "INSERT INTO zti_project.user (firstName, lastName, email, password, phone, address, image, description, messages, flightIds) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [firstName, lastName, email, password, phone, address, image, description, messages, flightIds],
            (error, results) => {
                if (error) {
                    res.status(500).json({ 'Error': error });
                } else {
                    res.status(200).json({ 'Message': 'User added' });
                }
            }
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
}


const updateUser = async (req, res) => {
    try {
      const user = req.body;
      const { user_id, ...updateFields } = user;
  
      if (!Object.keys(updateFields).length) {
        return res
          .status(400)
          .json({ Message: 'At least one parameter is required.' });
      }
  
      const setParams = Object.entries(updateFields)
        .map(([key, value], index) => {
          return `${key} = $${index + 1}`;
        })
        .join(', ');
  
      const setValues = Object.values(updateFields);
      setValues.push(user_id);
  
      const updateQuery = `UPDATE zti_project.user SET ${setParams} WHERE user_id = $${setValues.length} RETURNING *`;
  
      await pool.query(updateQuery, setValues, (error, results) => {
        if (error) {
          res.status(500).json({ Error: error });
        } else {
          res.status(200).json({ Message: 'User updated' });
        }
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
};  

const deleteUser = (req, res) => {
    try {
        const user_id = req.params.user_id

        pool.query("DELETE FROM zti_project.user WHERE user_id=$1",[user_id], (error, results) => {
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

const addMessage = async (req, res) => {
    try {
        const { user_id, message } = req.body;
        
        if (!user_id || !message) {
            return res.status(400).json({ 'Message': 'User ID and message are required.' });
        }

        await pool.query(
            "UPDATE zti_project.user SET messages = array_append(messages, $1) WHERE user_id = $2 RETURNING *",
            [message, user_id],
            (error, results) => {
                if (error) {
                    res.status(500).json({ 'Error': error });
                } else {
                    res.status(200).json({ 'Message': 'Message added' });
                }
            }
        );
    } catch (err) {
        res.status(500).json(err.message);
    }
}


const getUserFlightsHistory = async (req, res) => {
    try {
        const { user_id } = req.params;

        const userQuery = await pool.query('SELECT flightIds FROM zti_project.user WHERE user_id=$1', [user_id]);
        const flightIds = userQuery.rows[0].flightids;

        const response = await axios.post('http://localhost:3000/flight/flights_by_ids', { flightIds });

        const flightsMap = response.data.reduce((map, flight) => {
            if (!map[flight.id]) {
                map[flight.id] = flight;
            }
            return map;
        }, {});

        const flights = flightIds.map(id => flightsMap[id]);

        res.json(flights);
    } catch (err) {
        res.status(500).json(err.message);
    }
};


const makeReservation = async (req, res) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader.split(' ')[1];
        const { user_id, flightId } = req.body;
        console.log(req.body)

        pool.query('UPDATE zti_project.user SET flightIds = array_append(flightIds, $1) WHERE user_id = $2', [flightId, user_id])

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
        const { user_id, flightId } = req.body;

        const userQuery = await pool.query('SELECT flightIds FROM zti_project.user WHERE user_id=$1', [user_id]);
        const flightIds = userQuery.rows[0].flightids;

        const index = flightIds.indexOf(flightId);
        if (index !== -1) {
          flightIds.splice(index, 1);
        }

        await pool.query('UPDATE zti_project.user SET flightIds = $1 WHERE user_id = $2', [flightIds, user_id])

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
    addMessage,
    getUserFlightsHistory,
    makeReservation,
    cancelReservation,
}