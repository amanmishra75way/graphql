import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
    deleteUser(id: ID!): User
  }

  type Subscription {
    userAdded: User
  }
`;
