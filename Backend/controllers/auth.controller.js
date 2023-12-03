// const AuthService = require("../services/auth.service");
const AuthService = require("../services/auth.services");
const AuthServiceInstance = new AuthService();

const postSignup = async (request, response) => {
  try {
    const result = await AuthServiceInstance.signup(request.body);
    response.json(result);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

const postLogin = async (request, response) => {
  try {
    const result = await AuthServiceInstance.login(request.body);
    if (result.isLoggedIn) {
      response.cookie("token", result.token, {
        maxAge: 1000 * 60 * 60,
      });
      response.json(result);
    } else {
      response.sendStatus(403);
    }
  } catch (err) {
    console.error("Error during login:", err);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  postSignup,
  postLogin,
};
