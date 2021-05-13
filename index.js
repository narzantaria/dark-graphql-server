import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import typeDefs from "./src/typeDefs/heroType";
import resolvers from "./src/resolvers/heroResolver";

const app = express();

// Init Middleware
// Это то же, что body-parser:
app.use(express.json({ extended: false }));

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Shutruk-Nahhunte!!!");
});

mongoose
  .connect("mongodb://localhost/dark", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection to database established...");
    app.listen(5000, (_) => console.log("Server started at port 5000..."));
  })
  .catch((err) => {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  });
