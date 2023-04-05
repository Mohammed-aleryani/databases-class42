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

  executeSql(
    "CREATE table IF NOT exists account (account_number INT PRIMARY KEY , balance INT);"
  );
  executeSql(
    "CREATE table IF NOT exists account_changes (change_number INT AUTO_INCREMENT PRIMARY KEY, account_number INT, amount INT, changed_date DATETIME, remark VARCHAR(255),FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE );"
  );
});
