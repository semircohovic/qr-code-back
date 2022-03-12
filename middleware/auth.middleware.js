const jwt = require("jsonwebtoken");
const redis_client = require("../config/redis.config");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.userData = decoded;

    req.token = token;

    redis_client.get("BL_" + decoded.sub.toString(), (err, data) => {
      if (err) throw err;

      if (data === token)
        return res
          .status(401)
          .json({ status: false, message: "blacklisted token." });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid.",
      data: error,
    });
  }
}
function verifyRefreshToken(req, res, next) {
  const token = req.body.token;
  if (token === null)
    return res.status(401).json({ status: false, message: "Invalid request." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    req.userData = decoded;

    redis_client.get(decoded.sub.toString(), (err, data) => {
      if (err) throw err;

      if (data === null)
        return res.status(401).json({
          status: false,
          message: "Invalid request. Token is not in store",
        });
      if (JSON.parse(data).token != token)
        return res.status(401).json({
          status: false,
          message: "Invalid request. Token is not in store",
        });

      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: true,
      message: "Your session is not valid.",
      data: error,
    });
  }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};
