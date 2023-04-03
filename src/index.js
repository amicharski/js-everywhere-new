// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 4000;

const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    const app = express();

    app.use('/api', cors(), json(), expressMiddleware(server))
    
    app.listen({ port }, () => {
        console.log(`http://localhost:${port}${server.graphqlPath}`)
    });
});