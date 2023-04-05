import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const executeSql = (sql) => {
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
};

con.connect((err) => {
  if (err) throw err;
  executeSql("INSERT INTO account (account_number,balance) VALUE (101,5000);");
  executeSql("INSERT INTO account (account_number,balance) VALUE (102,7500);");
});
