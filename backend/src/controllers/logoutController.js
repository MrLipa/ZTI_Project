const pool = require("../model/db");

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204).json({ 'Message': 'User logout' });
    const refreshToken = cookies.jwt;

    const foundUser = await pool.query("SELECT * FROM zti_project.user JOIN zti_project.token USING (user_id) WHERE token=$1", [refreshToken]);

    if (foundUser.rows.length===0) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204).json({ 'Message': 'User logout' });
    }

    await pool.query("DELETE FROM zti_project.token WHERE token=$1", [foundUser.rows[0].refreshToken]);

    res.clearCookie('jwt', { httpOnly: true});
    res.sendStatus(204).json({ 'Message': 'User logout' });
}

module.exports = { handleLogout }