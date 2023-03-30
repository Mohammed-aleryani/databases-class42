import mysql from "mysql";
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

executeSql(
  "SELECT tableA.author_id, tableA.author_name, tableB.author_name AS mentor_name FROM authors AS tableA INNER JOIN authors AS tableB ON tableA.mentor = tableB.author_id"
);
executeSql(
  "SELECT authors.author_name,research_papers.paper_title FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id ORDER BY author_name"
);
