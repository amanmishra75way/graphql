import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Create HTTP server
const httpServer = http.createServer(app);

// Create schema with subscriptions
const schema = makeExecutableSchema({ typeDefs, resolvers });

// WebSocket server for Subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Attach subscriptions to WebSocket
useServer({ schema }, wsServer);

// Apollo Server (for queries + mutations)
const apolloServer = new ApolloServer({ schema });
await apolloServer.start();
apolloServer.applyMiddleware({ app });

// Connect to MongoDB and Start the Server
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");

  httpServer.listen(PORT, () => {
    console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
});
