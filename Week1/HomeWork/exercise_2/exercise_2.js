import mysql from "mysql";

const con =mysql.createConnection({
    host:"localhost",
    user:"hyfuser",
    password:"hyfpassword",
    database:"world"
});


con.connect((err)=>{
    if (err) throw err;
    console.log("database connected")
});

const executeSql=(sql)=>{
    con.query(sql,(err,result,fields)=>{
        if (err) throw err;
        console.log(result)
    });
};


// The names of countries with population greater than 8 million
executeSql("SELECT Name FROM world.country where Population>8000000;");

// The names of countries that have “land” in their names
executeSql('SELECT Name FROM world.country WHERE Name LIKE "%land%";');

// The names of the cities with population in between 500,000 and 1 million
executeSql('SELECT Name FROM world.city WHERE Population BETWEEN 500000 AND 1000000;');

// The name of all the countries on the continent ‘Europe’
executeSql('SELECT Name FROM world.country WHERE Continent ="Europe";');

// List of all the countries in the descending order of their surface areas
executeSql('SELECT * FROM world.country ORDER BY SurfaceArea desc;');

// The names of all the cities in the Netherlands
executeSql('SELECT Name FROM world.city WHERE CountryCode ="NLD";');

// The population of Rotterdam
executeSql('SELECT Name,Population FROM world.city  WHERE Name="Rotterdam";');

// The top 10 countries by Surface Area
executeSql('SELECT *FROM world.country  ORDER BY SurfaceArea DESC LIMIT 10;');

// The top 10 most populated cities
executeSql('SELECT *FROM world.city  ORDER BY Population DESC LIMIT 10;');

// The population number of the world
executeSql('SELECT SUM(Population) As "The population number of the world" FROM world.country;')

