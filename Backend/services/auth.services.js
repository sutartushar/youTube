const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./user.services");
const UserServiceInstance = new UserService();
require("dotenv").config();

class AuthService {
  signup = async (user) => {
    const hashedPassword = await this.hashPassword(user.password);
    const data = {
      ...user,
      password: hashedPassword,
    };
    return await UserServiceInstance.register(data);
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  login = async ({ username, password }) => {
    const isPasswordSame = await this.verifyPassword(username, password);
    if (isPasswordSame) {
      return { isLoggedIn: true, token: this.generateToken(username) };
    } else {
      return {};
    }
  };

  verifyPassword = async (username, password) => {
    const user = await UserServiceInstance.findByUsername(username);
    if (!user) return false;
    const storedPassword = user.password; // hash
    const isPasswordSame = await bcrypt.compare(password, storedPassword);
    if (isPasswordSame) return true;
    return false;
  };

  generateToken = (username) => {
    const payload = {
      username,
    };
    const options = {
      expiresIn: "1h",
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, options);
    return token;
  };
}

module.exports = AuthService;
