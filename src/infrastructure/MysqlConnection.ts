import mysql from "mysql";
import dotenv from "dotenv";
import util from "util";
import { IRDBConnection } from "../interfaces/database/IRDBConnection";

export class MysqlConnection extends IRDBConnection {
  private pool: any;

  constructor() {
    super();
    dotenv.config();
    this.pool = mysql.createPool({
      connectionLimit: 5,
      host: process.env.MYSQL_HOST_DEV,
      user: process.env.MYSQL_USER_DEV,
      password: process.env.MYSQL_PASSWORD_DEV,
      database: process.env.MYSQL_NAME_DEV,
      timezone: "utc",
    });

    this.pool.getConnection((error: any, connection: any) => {
      if (error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed.");
        }
        if (error.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections.");
        }
        if (error.code === "ECONNREFUSED") {
          console.error("Database connection was refused.");
        }
      }

      if (connection) connection.release();

      return;
    });
    this.pool.query = util.promisify(this.pool.query);

    // pool event
    this.pool.on("connection", (connection: any) => {
      console.log("mysql connection create");
    });

    this.pool.on("release", (connection: any) => {
      console.log("Connection %d released", connection.threadId);
    });
  }

  execute(query: string, params: any = null) {
    if (params !== null) {
      return this.pool.query(query, params);
    } else {
      return this.pool.query(query);
    }
  }
}
