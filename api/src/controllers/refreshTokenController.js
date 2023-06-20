const jwt = require("jsonwebtoken");
const pool = require("../model/db");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await pool.query(
    "SELECT * FROM zti_project.user JOIN zti_project.token USING (user_id) WHERE refresh_token=$1",
    [refreshToken]
  );

  if (foundUser.rows.length === 0) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.rows[0].email !== decoded.UserInfo.email)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          user_id: decoded.UserInfo.user_id,
          email: decoded.UserInfo.email,
          roles: [2137],
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    res.json({ accessToken, roles: [2137], user_id: foundUser.rows[0].user_id });
  });
};

module.exports = {
  handleRefreshToken,
};
