const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Account = sequelize.define(
    "Account",
    {
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CAD",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      branchName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountType: {
        type: DataTypes.ENUM,
        values: ["SAVINGS", "CHECKING"],
        defaultValue: "SAVINGS",
      },
    },
    {
      timestamps: true,
    }
  );

  return Account;
};
