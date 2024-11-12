const { StatusCodes } = require('http-status-codes');
const Jwt = require('jsonwebtoken');

const Logger = require('../../helpers/logger');

const context = "middlewareAuth";

const verifyBasic = () => {
  const ctx = `${context}.verifyBasic`;

  return async (request, reply, next) => {
    try {
      const authHeader = request.header("Authorization");
      token = authHeader.split(" ")[1];
      const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
      if(!authHeader || !decoded){
        return reply.status(StatusCodes.UNAUTHORIZED)
        .send({
          responseCode: StatusCodes.UNAUTHORIZED,
          responseDesc: "Invalid Token"
        });
      }
    } catch (err) {
      Logger.log([ctx, 'Error verify basic', 'ERROR'], {
        error: `${err}`,
      });
      if (err instanceof Jwt.TokenExpiredError) {
          return reply.status(StatusCodes.UNAUTHORIZED)
          .send({
            responseCode: StatusCodes.UNAUTHORIZED,
            responseDesc: "Access token expired!"
          });
      };
      return reply.status(StatusCodes.UNAUTHORIZED)
        .send({
          responseCode: StatusCodes.UNAUTHORIZED,
          responseDesc: "Unauthorized"
        });
    }

    next();
  };
};

module.exports = { verifyBasic };