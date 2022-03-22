import dotenv from "dotenv";
import { Options } from "graphql-yoga";
import { DataSource } from "typeorm";
import app from "./app";
import connectOptions from "./ormConfig";
dotenv.config();

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

new DataSource(connectOptions)
  .initialize()
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((err) => console.log(err));
