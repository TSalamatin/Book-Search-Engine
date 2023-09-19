const typeDefs = `
type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!, username: String): User
   me: User
  }
  
  type Mutation {
    addUser(username: String!, email: String!): Auth
    saveBook(userId: ID!, book: BookInput!): Auth  
    deleteBook(bookId: String!): User
    login(email: String!, password: String!): Auth
  }
  

  input BookInput {
   authors: [String]
   description: String!
   bookId: ID!
   image: String
   link: String
   title: String!

  }
`

module.exports = typeDefs;
