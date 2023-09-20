import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser';

import userRoutes from "../routes/user.routes";
import db from "../db/conections";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //initial methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  dbConnection() {
    db();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //JSON
    this.app.use(express.json());

    //MORGAN
    this.app.use(morgan("dev"));

    this.app.use(bodyParser.json())
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port " + this.port);
    });
  }
}

export default Server;
