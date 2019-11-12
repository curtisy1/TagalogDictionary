import SQLite from "react-native-sqlite-storage";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { dictionary } from "./models/Word";

export class DbHelper {
  static async initDatabase() {
    SQLite.enablePromise(true);

    return await createConnection({
      type: "react-native",
      database: "dictionary",
      location: "default",
      logging: "all",
      entities: [dictionary],
    });
  }
}
