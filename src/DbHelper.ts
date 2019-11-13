import SQLite from "react-native-sqlite-storage";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import { Dictionary } from "./models/Word";

export class DbHelper {
  static connection: Connection;

  static async initDatabase() {
    SQLite.enablePromise(true);

    if (!this.connection) {
      this.connection = await createConnection({
        type: "react-native",
        database: "dictionary",
        location: "default",
        logging: "all",
        entities: [Dictionary]
      });
    } else if (!this.connection.isConnected) {
      this.connection.connect();
    }

    return this.connection;
  }

  static async closeDatabase() {
    await this.connection.close();
  }
}
