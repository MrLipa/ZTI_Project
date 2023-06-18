const bcrypt = require('bcrypt');
const pool = require("../model/db");
const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ 'Message': 'Email and password are required.' });

    const foundUser = await pool.query("SELECT * FROM zti_project.user WHERE email=$1",[email]);

    if (foundUser.rows.length===0) return res.sendStatus(401);

    try {
        const match = await bcrypt.compare(password, foundUser.rows[0].password);
        if (match) {
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user_id": foundUser.rows[0].user_id,
                        "email": foundUser.rows[0].email,
                        "roles": [2137]
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15s' }
            );
            const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        "user_id": foundUser.rows[0].user_id,
                        "email": foundUser.rows[0].email,
                        "roles": [2137]
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            if((await pool.query("SELECT * FROM zti_project.token WHERE user_id=$1",[foundUser.rows[0].user_id])).rows.length===0)
            {
                await pool.query(
                    "INSERT INTO zti_project.token (user_id, refresh_token) VALUES($1,$2) RETURNING *",
                    [foundUser.rows[0].user_id,refreshToken]
                );
            }
            else
            { 
                await pool.query(
                    "UPDATE zti_project.token SET refresh_token = $2 WHERE user_id = $1 RETURNING *",
                    [foundUser.rows[0].user_id,refreshToken]
                );
            }
            
            res.cookie('jwt', refreshToken, { httpOnly: true,  maxAge: 24 * 60 * 60 * 1000 });
            res.json({accessToken, roles: [2137]});
        } else {
            res.sendStatus(401);
        }
    }catch (err) {
        res.status(500).json(err.message);
    } 

}

module.exports = { handleLogin };