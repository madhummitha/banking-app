const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      type: {
        type: DataTypes.ENUM("DEBIT", "CREDIT"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.INTEGER,
      },
      modeOfTransfer: {
        type: DataTypes.ENUM("IMPS", "NEFT", "RTGS"),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CAD",
      },
    },
    {
      timestamps: true,
    }
  );

  return Transaction;
};
