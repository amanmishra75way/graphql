// import { users } from "../data/users.js";

// let userList = [...users];

// export const resolvers = {
//   Query: {
//     users: () => userList,
//     user: (_, { id }) => userList.find((u) => u.id === id),
//   },
//   Mutation: {
//     addUser: (_, { name, age }) => {
//       const newUser = {
//         id: String(userList.length + 1),
//         name,
//         age,
//       };
//       userList.push(newUser);
//       return newUser;
//     },
//   },
// };

import { User } from "../models/User.js";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    addUser: async (_, { name, age }) => {
      const user = new User({ name, age });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    },
  },
};
