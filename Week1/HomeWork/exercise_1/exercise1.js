import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

con.connect((err) => {
  if (err) throw err;
});

const executeSql = (sql) => {
  con.query(sql, (err) => {
    if (err) throw err;
  });
};

const meetingStarts="'2023-04-16 14:00:00'";
const meetingEnds="'2023-04-16 16:30:00'";


executeSql("CREATE DATABASE IF NOT EXISTS meetup");
executeSql("DROP TABLE IF EXISTS Meeting");
executeSql("DROP TABLE IF EXISTS Invitee");
executeSql("DROP TABLE IF EXISTS Room");

executeSql(
  "CREATE TABLE Invitee(invitee_no INT PRIMARY KEY,invitee_name varchar(100),invited_by varchar(100))"
);

executeSql(
  "CREATE TABLE Room(room_no INT PRIMARY KEY,room_name varchar(155),floor_number int)"
);

executeSql(
  "CREATE TABLE  Meeting(meeting_no INT AUTO_INCREMENT PRIMARY KEY,meeting_title varchar(155),starting_time DATETIME,time_ending DATETIME,room_no INT,invitee_no INT,FOREIGN KEY (room_no) REFERENCES Room(room_no) ON DELETE CASCADE, FOREIGN KEY (invitee_no) REFERENCES Invitee(invitee_no) ON DELETE CASCADE)"
);

executeSql(
  "INSERT INTO Invitee VALUES(1,'John','Ali'),(2,'Arman','Ali'),(3,'Rob','Mohammed'),(4,'Tamer','Mick'),(5,'Ahmed','Mick')"
);

executeSql(
  "INSERT INTO Room VALUES(1,'First meeting room',1),(2,'Seconde meeting room',1),(3,'Third meeting room',2),(4,'Fourth meeting room',2),(5,'Fifth meeting room',3)"
);

executeSql(
  `INSERT INTO Meeting (meeting_title, starting_time, time_ending, room_no, invitee_no) VALUES ('Middle east', ${meetingStarts}, ${meetingEnds}, 1, 2), ('Hack your future', ${meetingStarts},${meetingEnds}, 3, 1), ('Meet and great',${meetingStarts}, ${meetingEnds}, 4, 2), ('work shop', ${meetingStarts}, ${meetingEnds}, 5, 4), ('Middle east', ${meetingStarts}, ${meetingEnds}, 3, 1);`
);
