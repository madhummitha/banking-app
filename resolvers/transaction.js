const { sequelize } = require("../models");
const { Account, Transaction } = require("../models");

const queries = {
  getTransactionHistory: async (_, _query, { user }) => {
    try {
      const transactions = await Transaction.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
      });
      return transactions;
    } catch (error) {
      throw new Error("Error retrieving transaction history: " + error.message);
    }
  },
};

const mutations = {
  transferFunds: async (
    _,
    { destinationAccountNumber, amount, modeOfTransfer },
    { user }
  ) => {
    try {
      const sourceAccount = await Account.findOne({
        where: { userId: user.id },
      });
      const destinationAccount = await Account.findOne({
        where: { accountNumber: destinationAccountNumber },
      });

      if (!sourceAccount) {
        throw new Error("Invalid Source Account");
      }
      if (!destinationAccount) {
        throw new Error("Invalid Destination Account");
      }

      if (amount <= 0) {
        throw new Error("Amount must be greater than zero");
      }

      if (sourceAccount.balance < amount) {
        throw new Error("Insufficient funds");
      }

      await sequelize.transaction(async (t) => {
        const sourceBalance = parseFloat(sourceAccount.balance);
        const destinationBalance = parseFloat(destinationAccount.balance);
        const transferAmount = parseFloat(amount);

        sourceAccount.balance = sourceBalance - transferAmount;
        destinationAccount.balance = destinationBalance + transferAmount;

        await sourceAccount.save({ transaction: t });
        await destinationAccount.save({ transaction: t });

        await Transaction.create(
          {
            accountId: sourceAccount.id,
            userId: sourceAccount.userId,
            type: "DEBIT",
            amount,
            modeOfTransfer,
          },
          { transaction: t }
        );

        await Transaction.create(
          {
            accountId: destinationAccount.id,
            userId: destinationAccount.userId,
            type: "CREDIT",
            amount,
            modeOfTransfer,
          },
          { transaction: t }
        );
      });

      return "Transfer Successful!";
    } catch (error) {
      console.log(error);
      throw new Error("Error during transfer: " + error.message);
    }
  },
};
module.exports = { queries, mutations };
