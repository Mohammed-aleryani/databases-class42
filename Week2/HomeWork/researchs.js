import mysql from "mysql";
import { authors, research_papers,authors_papers } from "./authersResearchSheets.js";
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const executeSql = (sql, values) => {
  con.query(sql, [values], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
};

con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});


executeSql("DROP TABLE IF EXISTS authorS_papers");
executeSql("DROP TABLE IF EXISTS research_papers ;");
executeSql("SET FOREIGN_KEY_CHECKS=0");
executeSql(
  `INSERT INTO authors (author_name, university ,date_of_birth,h_index,gender,mentor) VALUES ?`,
  authors
);
executeSql(
  "CREATE TABLE IF NOT EXISTS research_papers ( paper_id INT AUTO_INCREMENT PRIMARY KEY,paper_title VARCHAR(255),conference VARCHAR(255),publish_date VARCHAR(255));"
);
executeSql("CREATE TABLE IF NOT EXISTS authors_papers (id INT AUTO_INCREMENT PRIMARY KEY,  author_id INT,paper_id INT ,FOREIGN KEY (author_id) REFERENCES authors(author_id)  ON DELETE CASCADE ,FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)  ON DELETE CASCADE)");
executeSql(
  `INSERT INTO research_papers (paper_title, conference ,publish_date) VALUES ?`,
  research_papers
);

executeSql(
  `INSERT INTO authors_papers (author_id,paper_id) VALUES ?`,
  authors_papers
);
executeSql("SET FOREIGN_KEY_CHECKS=1");
