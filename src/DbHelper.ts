import SQLite, {
  ResultSetRowList,
  SQLiteDatabase
} from "react-native-sqlite-storage";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { dictionary } from "./models/Word";

export class DbHelper {
  private static db: SQLiteDatabase;

  static async createConnection() {
    console.log("Creating connection");
    return await createConnection({
      type: "react-native",
      database: "tagalogDictionary.sqlite",
      location: "default",
      logging: "all",
      entities: [dictionary]
    });
  }

//   static initialize() {
//     if (!this.db) {
//       this.db = SQLite.openDatabase(
//         {
//           name: "dictionary",
//           createFromLocation: "~www/tagalogDictionary.sqlite",
//           location: "default"
//         },
//         () => true,
//         e => console.error(`Error initializing DB! Error is: ${e}`)
//       );
//     }
//   }

//   static closeConnection() {
//     if (this.db) {
//       this.db.close(
//         () => true,
//         error => console.error(`Error closing DB! Error is ${error}`)
//       );
//     }
//   }

//   private static wordQueryBase = `SELECT * FROM dictionary d WHERE word LIKE 'PLACEHOLDER'`;
//   private static wordQueryAll = `SELECT * FROM dictionary d`;
//   private static amountQueryBase = `SELECT *
//   FROM dictionary d
//   LIMIT AMOUNT
//   OFFSET SKIP
//   `;

//   private static fillResults(resultList: any[], queriedRows: ResultSetRowList) {
//     const resultLength = queriedRows.length;
//     for (let i = 0; i < resultLength; i++) {
//       const row = queriedRows.item(i);
//       resultList.push(row);
//     }
//   }

//   static async loadAllFromCatalog() {
//     let resultList: any[] = [];

//     if (!this.db) {
//       this.initialize();
//     }

//     return new Promise<any>((resolve, reject) => {
//       this.db.transaction(tx => {
//         tx.executeSql(this.wordQueryAll, [], (tx, results) => {
//           this.fillResults(resultList, results.rows);
//           resolve(resultList);
//         });
//       });
//     });
//   }

//   static async loadAmountFromCatalog(offset: number, amount: number) {
//     let resultList: any[] = [];

//     if (!this.db) {
//       this.initialize();
//     }

//     return new Promise<any>((resolve, reject) => {
//       this.db.transaction(tx => {
//         tx.executeSql(
//           this.amountQueryBase
//             .replace("AMOUNT", `${amount}`)
//             .replace("SKIP", `${offset}`),
//           [],
//           (tx, results) => {
//             this.fillResults(resultList, results.rows);
//             resolve(resultList);
//           }
//         );
//       });
//     });
//   }

//   static async wordSearch(word: string) {
//     let resultList: any[] = [];

//     if (!this.db) {
//       this.initialize();
//     }

//     return new Promise<any>((resolve, reject) => {
//       this.db.transaction(tx => {
//         // first try if word begins with
//         tx.executeSql(
//           this.wordQueryBase.replace("PLACEHOLDER", `${word}%`),
//           [],
//           (tx, results) => {
//             const resultLength = results.rows.length;
//             if (resultLength <= 0) {
//               // retry with full-text search
//               tx.executeSql(
//                 this.wordQueryBase.replace("PLACEHOLDER", `%${word}%`),
//                 [],
//                 (tx, results) => {
//                   const resultLength = results.rows.length;
//                   if (resultLength <= 0) {
//                     return;
//                   }

//                   this.fillResults(resultList, results.rows);
//                   resolve(resultList);
//                 }
//               );
//             }

//             this.fillResults(resultList, results.rows);
//             resolve(resultList);
//           }
//         );
//       });
//     });
//   }
}
