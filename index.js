const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const sequelize = require("./config/database");
const typeDefs = require("./schema");
const authResolvers = require("./resolvers/auth");
const accountResolvers = require("./resolvers/account");
const transactionResolvers = require("./resolvers/transaction");
const authenticateToken = require("./middleware/authenticateToken");

const init = async () => {
  const app = express();

  const resolvers = {
    Query: {
      ...accountResolvers.queries,
      ...transactionResolvers.queries,
    },
    Mutation: {
      ...authResolvers.mutations,
      ...accountResolvers.mutations,
      ...transactionResolvers.mutations,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/",
    express.json(),
    expressMiddleware(server, {
      context: ({ req }) => {
        const token = req.headers.authorization || "";
        const user = authenticateToken(token);
        return { user };
      },
    })
  );

  app.listen({ port: process.env.PORT || 5000 }, async () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT || 5000}
      }`
    );

    await sequelize.sync();
  });
};

init();
