import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

conn.connect((err) => {
  if (err) throw err;

  //   function getPopulation(Country, name, code, cb) {
  //     // assuming that connection to the database is established and stored as conn
  //     conn.query(
  //       `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
  //       function (err, result) {
  //         if (err) cb(err);
  //         if (result.length == 0) cb(new Error("Not found"));
  //         cb(null, result);
  //       }
  //     );
  //   }

  function getPopulation(country, name, code, cb) {
    conn.query(
      'SELECT Population FROM ?? WHERE Name = ? and code = ?',
      [country, name, code],
       (err, result,fields)=> {
        if (err) return cb(err);
        if (result.length == 0) return cb(new Error("Not found"));
        cb(null, result);
      }
    );
  }
  getPopulation('country', 'yemen', "YEM", console.log);;
});
