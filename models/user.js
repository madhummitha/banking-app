const bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
