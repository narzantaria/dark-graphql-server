import express from "express";
import cors from "cors";
import path from "path";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./db";
require("dotenv").config();
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./src/typeDefs";
import resolvers from "./src/resolvers";

import routes from "./src/routes";

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

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Shutruk-Nahhunte!!!");
});

app.use(express.static(path.join(__dirname, "files")));

connectDB();

app.listen(PORT, (_) => console.log(`Server started at ${PORT}...`));
