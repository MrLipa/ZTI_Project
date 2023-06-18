const pool = require("../model/db");



const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204).json({ 'Message': 'No token' });
    const refreshToken = cookies.jwt;

    const foundUser = await pool.query("SELECT * FROM zti_project.user JOIN zti_project.token USING (user_id) WHERE refresh_token=$1", [refreshToken]);

    if (foundUser.rows.length===0) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.status(200).json({ 'Message': 'User logout' });
    }

    await pool.query("DELETE FROM zti_project.token WHERE refresh_token=$1", [foundUser.rows[0].refresh_token]);

    res.clearCookie('jwt', { httpOnly: true});
    res.status(200).json({ 'Message': 'User logout' });
}



module.exports = { 
    handleLogout 
}