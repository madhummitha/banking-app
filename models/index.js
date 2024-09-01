const sequelize = require("../config/database");

const User = require("./user")(sequelize);
const Account = require("./account")(sequelize);
const Transaction = require("./transaction")(sequelize);

User.hasOne(Account, { foreignKey: "userId" });
Account.hasMany(Transaction, { foreignKey: "accountId" });

module.exports = {
  sequelize,
  User,
  Account,
  Transaction,
};
