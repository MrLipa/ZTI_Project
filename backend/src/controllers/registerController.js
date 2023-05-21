const bcrypt = require('bcrypt');
const pool = require("../model/db");

const handleNewUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const image = ''
    const flightIds = []
    if (!firstName || !lastName || !email || !password) 
    return res.status(400).json({ 'Message': 'First Name, Last Name, Email and Password are required.' });

    const duplicate = await pool.query("SELECT * FROM zti_project.user WHERE email=$1",[email]);
    
    if (duplicate.rowCount!=0) return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO zti_project.user (firstName,lastName,email,password,image,flightIds) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [firstName,lastName,email,hashedPassword,image,flightIds]);

        res.status(201).json({ 'success': `New user ${email} created!` });
    }catch (err) {
        res.status(500).json(err.message);
    } 
}

module.exports = { handleNewUser };