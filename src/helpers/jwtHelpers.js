const Jwt = require('jsonwebtoken');

const generateToken = async (data) => {
  const username = data.username;
    const verifyOptionsAccess = {
      algorithm: "HS512",
      expiresIn: "1d"
    };
    const access_token = { username };;
    const access_token_sign = Jwt.sign(access_token, process.env.JWT_SECRET, verifyOptionsAccess);
  
    return {
      username,
      access_token: access_token_sign
    };
};

module.exports = {
  generateToken
}
