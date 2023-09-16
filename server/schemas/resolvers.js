const { Book, User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    addUser: async (parent, { name }) => {
      return User.create({ name });
    },
    addBook: async (parent, {book}) => {
      return Book.create( {book});
    },
    saveBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedBooks: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeBook: async (parent, { userId, bookId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { savedBooks: bookId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    
    
  },
};

module.exports = resolvers;
