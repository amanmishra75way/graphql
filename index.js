import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(process.env.PORT, () =>
        console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
      );
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

start();
