require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { converter } = require("./csvToJson");

const { seedDatabase } = require("./seedDatabase.js");

const totalPopulation = async (client, country = "Netherlands") => {
  const pipeline = [
    { $match: { Country: country } },
    {
      $group: {
        _id: "$Year",
        countPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
  ];
  const aggCursor = client
    .db("databaseWeek4")
    .collection("population_pyramid_1950-2022")
    .aggregate(pipeline)
    .sort({ _id: 1 });
  for await (const doc of aggCursor) {
    console.log(doc);
  }
};

const continent = async (client, year = "2020", age = "100+") => {
  const pipeline = [
    {
      $match: {
        $and: [
          {
            Country: {
              $in: [
                "AFRICA",
                "ASIA",
                "EUROPE",
                "LATIN AMERICA AND THE CARIBBEAN",
                "NORTHERN AMERICA",
                "OCEANIA",
              ],
            },
          },
          { Year: { $eq: year } },
          { Age: { $eq: age } },
        ],
      },
    },
    {
      $addFields: { TotalPopulation: { $add: ["$M", "$F"] } },
    },
  ];
  const aggCursor = client
    .db("databaseWeek4")
    .collection("population_pyramid_1950-2022")
    .aggregate(pipeline)
    .sort({ _id: 1 });
  for await (const doc of aggCursor) {
    console.log(doc);
  }
};
async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await converter();
    await client.connect();

    await seedDatabase(client);

    await totalPopulation(client);

    await continent(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
