const { User } = require("../models");
const jwt = require("jsonwebtoken");

const mutations = {
  signup: async (_, { email, password }) => {
    try {
      const user = await User.create({ email, password });
      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      throw new Error("Invalid Credentials");
    }
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  },
};

module.exports = {
  mutations,
};
