import mysql from 'mysql';


const con=mysql.createConnection({
    host:"localhost",
    user:"hyfuser",
    password:"hyfpassword",
    database:"meetup"
});

con.connect((err)=>{
    if(err) throw err;
});

const executeSql=(sql)=>{
    con.query(sql,(err)=>{
        if(err) throw err;
    });
}


let sql="CREATE DATABASE meetup";
// executeSql(sql);

sql="CREATE TABLE Invitee(invitee_no int,invitee_name varchar(100),invited_by varchar(100))"
executeSql(sql);

sql="CREATE TABLE Room(room_no int,room_name varchar(155),floor_number int)"
executeSql(sql);

sql="CREATE TABLE Meeting(meeting_no int,meeting_title varchar(155),starting_time char(50),time_ending char(50),room_no int)";
executeSql(sql);

sql="INSERT INTO Invitee VALUES(1,'John','Ali'),(2,'Arman','Ali'),(3,'Rob','Mohammed'),(4,'Tamer','Mick'),(5,'Ahmed','Mick')";
executeSql(sql);

sql="INSERT INTO Room VALUES(1,'First meeting room',1),(2,'Seconde meeting room',1),(3,'Third meeting room',2),(4,'Fourth meeting room',2),(5,'Fifth meeting room',3)";
executeSql(sql);

sql="INSERT INTO Meeting VALUES(1,'Middle east','13:00','20:00',1),(1,'Hack your future','16:00','22:00',3),(3,'Meet and great','13:00','15:00',4),(4,'work shope','13:00','20:00',5),(5,'Middle east','17:30','22:00',3)";
executeSql(sql);