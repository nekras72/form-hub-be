import express from "express";
import morgan from "morgan";
import db from "./modules/db";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from 'http';
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";

interface MyContext {
    token?: string;
}

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/', async (req, res) => {
    const submissions = await db.submission.findMany();
    res.json(submissions);
});

const startServer = async () => {
    const httpServer = http.createServer(app);
    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        cache: 'bounded',
        csrfPrevention: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();
    // Specify the path where we'd like to mount our server
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }));
    const port = Number(process.env.PORT ?? 8080);
    const host = '0.0.0.0';
    await new Promise<void>((resolve) => {
        httpServer.listen({ port, host }, resolve);
        console.log(`server is running at port ${port}`);
    });
};

startServer();

// app.listen(port, '0.0.0.0', () => {
// });