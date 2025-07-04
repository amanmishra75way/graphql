import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
}

start();
