const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }

  type Account {
    id: ID!
    userId: ID!
    balance: Float!
    accountNumber: String!
    currency: String
    branchName: String!
    accountType: String!
  }

  enum ModeOfTransferEnum {
    IMPS
    NEFT
    RTGS
  }

  enum TransactionTypeEnum {
    DEBIT
    CREDIT
  }

  type Transaction {
    id: ID!
    accountId: ID!
    userId: ID!
    type: TransactionTypeEnum!
    amount: Float!
    currency: String!
    modeOfTransfer: ModeOfTransferEnum!
  }

  type Query {
    viewAccountBalance: Float
    getTransactionHistory: [Transaction]
  }

  type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): String
    createAccount(accountNumber: String!, branchName: String!, accountType: String!, balance: Float!): Account
    updateAccount(branchName: String!, accountType: String!): Account
    transferFunds(
      destinationAccountNumber: String!
      amount: Float!
      modeOfTransfer: ModeOfTransferEnum!
    ): String
  }
`;

module.exports = typeDefs;
