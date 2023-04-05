const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const s9e13 = {
    episode: " S09E13",
    title: " MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(s9e13);
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  let result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${result.title}`);
  result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${result.episode}`
  );

  let cursor = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" });
  let list_results = await cursor.toArray();
  let list_titles = [];
  list_results.forEach((episode) => list_titles.push(episode.title));

  console.log(`The episodes that Bob Ross painted a CLIFF are ${list_titles}`);

  cursor = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } });
  list_results = await cursor.toArray();
  list_titles = [];
  list_results.forEach((episode) => list_titles.push(episode.title));
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${list_titles}`
  );
}

async function updateEpisodeExercises(client) {
  try {
    result = await client
      .db("databaseWeek3")
      .collection("bob_ross_episodes")
      .updateOne(
        { episode: "S30E13" },
        { $set: { title: "BLUE RIDGE FALLS" } }
      );
  } catch (e) {
    console.error(e);
  }
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`
  );

  result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany(
      { elements: { $eq: "BUSHES" } },
      { $set: { "elements.$[element]": "BUSH" } },
      { arrayFilters: [{ element: { $eq: "BUSHES" } }] }
    );

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${result.matchedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
  );
}

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
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();


