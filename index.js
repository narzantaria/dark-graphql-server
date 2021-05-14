import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import connectDB from './db';
require('dotenv').config();
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./src/typeDefs";
import resolvers from "./src/resolvers";

const PORT = process.env.PORT || 5000;

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Init Middleware
// Это то же, что body-parser:
app.use(express.json({ extended: false }));

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Shutruk-Nahhunte!!!");
});

connectDB();

app.listen(PORT, _ => console.log(`Server started at ${PORT}...`));
