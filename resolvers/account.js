const { Account } = require("../models");

const queries = {
  viewAccountBalance: async (_, _query, { user }) => {
    try {
      const account = await Account.findOne({
        where: { userId: user.id },
      });
      if (!account) {
        throw new Error("Account not found");
      }
      return account.balance;
    } catch (error) {
      throw new Error("Error retrieving account balance: " + error.message);
    }
  },
};

const mutations = {
  createAccount: async (
    _,
    { accountNumber, branchName, accountType, balance },
    { user }
  ) => {
    try {
      const existingUserAccount = await Account.findOne({
        where: { userId: user.id },
      });
      if (existingUserAccount) {
        throw new Error("Account already exists for this user");
      }
      const existingAccount = await Account.findOne({
        where: { accountNumber },
      });
      if (existingAccount) {
        throw new Error("Account already exists");
      }
      const account = await Account.create({
        accountNumber,
        branchName,
        accountType,
        userId: user.id,
        balance,
      });
      return account;
    } catch (error) {
      console.log("Error creating account", error.message);
      throw new Error("Error creating account: " + error.message);
    }
  },

  updateAccount: async (_, { branchName, accountType }, { user }) => {
    try {
      const account = await Account.findOne({
        where: { userId: user.id },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      await account.update({
        branchName: branchName || account.branchName,
        accountType: accountType || account.accountType,
      });

      return account;
    } catch (error) {
      console.log("Error updating account", error.message);
      throw new Error("Error updating account: " + error.message);
    }
  },
};

module.exports = { queries, mutations };
