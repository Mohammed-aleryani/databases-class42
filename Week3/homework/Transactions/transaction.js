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

  executeSql("START TRANSACTION;");
  executeSql(
    "UPDATE account SET balance = balance - 1000 WHERE account_number = 101;"
  );
  executeSql(
    "INSERT INTO account_changes (account_number, amount, changed_date,remark) VALUES (101, -1000, NOW(),'House rent');"
  );
  executeSql(
    "UPDATE account SET balance = balance + 1000 WHERE account_number = 102;"
  );
  executeSql(
    "INSERT INTO account_changes (account_number, amount, changed_date,remark) VALUES (102, +1000, NOW(),'House rent');"
  );
  executeSql("COMMIT;");
});
