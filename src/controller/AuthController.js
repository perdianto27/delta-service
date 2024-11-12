const { StatusCodes } = require('http-status-codes');

const Logger = require('../helpers/logger');
const JwtHelpers = require('../helpers/jwtHelpers');

const logName = 'API Auth';

const postLogin = async (request, reply) => {
  try {

    const token = await JwtHelpers.generateToken(request.body);

    return reply
    .status(StatusCodes.CREATED)
    .send({
      responseCode: StatusCodes.CREATED,
      responseDesc: "Login berhasil",
      data: token
    });
  } catch (error) {
    Logger.log([logName, 'POST Login', 'ERROR'], {
      message: `${error}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Wrong Username or Password"
    });
  }
};

const getSecure = async (request, reply) => {
  try {
    return reply
    .status(StatusCodes.OK)
    .send({
      responseCode: StatusCodes.OK,
      responseDesc: "Access granted"
    });
  } catch (error) {
    Logger.log([logName, 'GET Secure', 'ERROR'], {
      message: `${error}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Unauthorized access"
    });
  }
};


module.exports = {
  postLogin,
  getSecure
};