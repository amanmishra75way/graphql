import { users } from "../data/users.js";

let userList = [...users];

export const resolvers = {
  Query: {
    users: () => userList,
    user: (_, { id }) => userList.find((u) => u.id === id),
  },
  Mutation: {
    addUser: (_, { name, age }) => {
      const newUser = {
        id: String(userList.length + 1),
        name,
        age,
      };
      userList.push(newUser);
      return newUser;
    },
  },
};
