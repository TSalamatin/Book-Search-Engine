const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [String]!
  }

  type Book {
    _id: ID
    authors: [String]!
    description: String
    image: String
    link: String
    title: String
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Query {
    books: [Book]!
    book(bookId: ID!): Book
  }
  
  type Mutation {
    addUser(name: String!): User
    addBook(bookInput: BookInput!): Book
    saveBook(userId: ID!, book: BookInput!): User  # Add this line
    removeBook(userId: ID!, bookId: ID!): User  # Assuming you also have a removeBook mutation
  }
  

  input BookInput {
   authors: [String!]
   description: String
   bookId: ID
   image: String
   link: String
   title: String

  }
`

module.exports = typeDefs;
