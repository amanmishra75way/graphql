import { PubSub } from "graphql-subscriptions";
import { User } from "../models/User.js";

const pubsub = new PubSub();
const USER_ADDED = "USER_ADDED";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    addUser: async (_, { name, age }) => {
      const user = new User({ name, age });
      await user.save();
      pubsub.publish(USER_ADDED, { userAdded: user });
      return user;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator([USER_ADDED]),
    },
  },
};
