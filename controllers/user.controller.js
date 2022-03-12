const User = require("../models/user.model");
const redis_client = require("../config/redis.config");
const jwt = require("jsonwebtoken");

function generateRefreshToken(user_id) {
  const refresh_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_TIME }
  );

  redis_client.get(user_id.toString(), (err, data) => {
    if (err) {
      throw err;
    }
    console.log("test");
    redis_client.set(
      user_id.toString(),
      JSON.stringify({ token: refresh_token })
    );
  });

  return refresh_token;
}
function GetAccessToken(req, res) {
  const user_id = req.userData.sub;
  const access_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: process.env.JWT_ACCESS_TIME }
  );
  const refres_token = generateRefreshToken(user_id);
  return res.json({
    status: true,
    message: "success",
    data: { access_token, refres_token },
  });
}
async function Register(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const saved_user = await user.save();
    res.json({
      status: true,
      message: "Registered successfully.",
      data: saved_user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong.", data: error });
  }
}
async function Login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username,
      password: password,
    }).exec();

    if (user === null)
      res
        .status(401)
        .json({ status: false, message: "username or password is not valid" });
    console.log("stalo");
    const access_token = jwt.sign(
      { sub: user._id },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_TIME }
    );
    const refresh_token = generateRefreshToken(user._id);
    return res.json({
      status: true,
      message: "login success",
      data: { access_token, refresh_token },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ status: true, message: "login failed", data: error });
  }
}
async function Logout(req, res) {
  const user_id = req.userData.sub;
  const token = req.token;

  await redis_client.del(user_id.toString());

  await redis_client.set("BL_" + user_id.toString(), token);

  return res.json({ status: true, message: "success logout." });
}
function Test(req, res) {
  return res.json({ status: true, message: "hello" });
}
module.exports = {
  Register,
  Login,
  Logout,
  GetAccessToken,
  Test,
};
