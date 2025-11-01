const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const app = require('./app');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { conn } = require('./db');
const { PORT } = process.env;

async function start() {
    try {
        await conn.authenticate();
        console.log('✅ DB connected');
    } catch (err) {
        console.error('❌ DB connection failed:', err);
        process.exit(1);
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    const port = PORT || 4000;
    const httpServer = http.createServer(app);

    httpServer.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });
}

start();