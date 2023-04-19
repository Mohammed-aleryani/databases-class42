// I modified the file based on the file from week3

const data = require("./jsonData.json");

const seedDatabase = async (client) => {
  const hasCollection = await client
    .db("databaseWeek4")
    .listCollections({ name: "population_pyramid_1950-2022" })
    .hasNext();

  if (hasCollection) {
    const bobRossCollection = await client
      .db("databaseWeek4")
      .collection("population_pyramid_1950-2022");

    await bobRossCollection.deleteMany({});

    const documents = data.map((dataItem) => {
      const { Country, Year, Age, M, F } = dataItem;
      return {
        Country: Country,
        Year: Year,
        Age: Age,
        M: parseInt(M),
        F: parseInt(F),
      };
    });

    await bobRossCollection.insertMany(documents);
  } else {
    throw Error(
      "The collection `population_pyramid_1950-2022` does not exist!"
    );
  }
};

module.exports = {
  seedDatabase,
};
