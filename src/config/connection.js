import mongoose from "mongoose";
import { config } from "dotenv";
config();

const url = process.env.DB_CONNECTION_URL;

export const DBConnection = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("error could not connect to database \n", err?.message);
      } else {
        console.log("Database successfully connected");
      }
    }
  );
};

