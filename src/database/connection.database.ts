import { Sequelize } from "sequelize-typescript";
import { Dog } from "../models/dogs.model";
import { Human } from "../models/humans.model";

const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE_NAME || "sequelize_test",
  logging: true,
  models: [Dog, Human],
});

export default connection;