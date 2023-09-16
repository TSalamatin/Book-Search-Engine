const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your static assets (e.g., React client) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
async function startApolloServer() {
  await server.start();
  
  // Apply ApolloServer middleware to the /graphql endpoint
  server.applyMiddleware({ app, path: '/graphql' });

  // Start your MongoDB connection
  db.once('open', () => {
    // Start your Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`GraphQL server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

// Call the async function to start the server
startApolloServer();
