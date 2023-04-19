// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const cors = require('cors');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

require('dotenv').config();
const db = require('./db');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrision' },
]

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: () => {
        return { models }
    } 
});

server.start().then(() => {
    const app = express();

    app.use('/api', cors(), json(), expressMiddleware(server))
    
    app.listen({ port }, () => {
        console.log(`http://localhost:${port}${server.graphqlPath}`)
    });
});