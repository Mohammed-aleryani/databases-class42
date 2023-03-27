import mysql from  'mysql';

const con=mysql.createConnection({
    host:'localhost',
    user:'hyfuser',
    password:'hyfpassword',
    database:'userdb'
});

const executeSql=(sql)=>{
    con.query(sql,(err,result,fields)=>{
        if (err) throw err;
        console.log(result)
    });
};

con.connect((err)=>{
    if(err) throw err;
    console.log('Connected');
});

executeSql("CREATE TABLE authors (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(255), university VARCHAR(255),date_of_birth VARCHAR(255),h_index VARCHAR(255),gender VARCHAR(10));");

executeSql("ALTER TABLE authors ADD COLUMN mentor INT NOT NULL;");

executeSql("ALTER TABLE authors ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);");

executeSql('UPDATE authors SET mentor = 57')