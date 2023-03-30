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
  "SELECT research_papers.paper_title,COUNT(authors.author_name) AS 'number of authors wrote it' FROM authors RIGHT JOIN authors_papers ON authors.author_id=authors_papers.author_id RIGHT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id GROUP BY research_papers.paper_title"
);

executeSql(
  "SELECT gender,COUNT(research_papers.paper_id) AS 'number of a female authors' FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id WHERE gender='female' GROUP BY authors.gender"
);

executeSql(
  "SELECT university,AVG(h_index) AS 'Average of the h-index ' FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id GROUP BY authors.university"
);

executeSql(
  "SELECT university,COUNT(author_name) AS 'Sum of the research papers of the authors ' FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id GROUP BY authors.university"
);

executeSql(
  "SELECT university,MAX(h_index) AS 'Max of the h-index ' FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id GROUP BY authors.university"
);

executeSql(
  "SELECT university,min(h_index) AS 'Min of the h-index ' FROM authors LEFT JOIN authors_papers ON authors.author_id=authors_papers.author_id LEFT JOIN research_papers ON research_papers.paper_id=authors_papers.paper_id GROUP BY authors.university"
);
