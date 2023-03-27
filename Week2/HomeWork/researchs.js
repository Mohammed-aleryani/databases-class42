import mysql from "mysql";
import { authors,research_papers } from "./authersResearchSheets.js";
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const executeSql = (sql,values) => {
  con.query(sql,[values], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
};

con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

executeSql(
  "CREATE TABLE IF NOT EXISTS research_papers ( paper_id INT AUTO_INCREMENT PRIMARY KEY,paper_title VARCHAR(255),conference VARCHAR(255),publish_date VARCHAR(255),author_id INT,FOREIGN KEY (author_id) REFERENCES authors(author_id));"
);

executeSql(`INSERT INTO authors (author_name, university ,date_of_birth,h_index,gender) VALUES ?`,authors)
executeSql(`INSERT INTO research_papers (paper_title, conference ,publish_date,author_id) VALUES ?`,research_papers)


