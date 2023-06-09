import cors from "cors";
import { config } from "dotenv";
import express from "express";
import apiRoutes from "./routes/index.routes.js";
import errorHandlingMiddleware from "./middleware/error-handling.middleware.js";
import { NotFoundError } from "./helpers/error.js";
import { DBConnection } from './config/connection.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// setup for cors error issue
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  credentials: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** ________________________Database connection_________________________ */
DBConnection();


app.use(apiRoutes);

app.get("/", (request, response) => {

  console.log("get method called");
  
   response.status(200).json({
    status: "success",
    message: "Welcome to Berenia Technology",
    data: {
      service: "Berenia Technology",
      version: "1.0.0",
    },
  });
});

app.all("*", (request, response) => {
  throw new NotFoundError("Invalid route.");
});

app.use(errorHandlingMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
