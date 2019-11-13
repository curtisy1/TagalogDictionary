import SQLite from "react-native-sqlite-storage";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import { dictionary } from "./models/Word";

export class DbHelper {
  static connection: Connection;

  static async initDatabase() {
    SQLite.enablePromise(true);

    this.connection = await createConnection({
      type: "react-native",
      database: "dictionary",
      location: "default",
      logging: "all",
      entities: [dictionary]
    });

    return this.connection;
  }

  static async closeDatabase() {
    await this.connection.close();
  }
}
