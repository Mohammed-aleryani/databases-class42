require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { setup } = require("./setup.js");
const { transferCredits } = require("./transfer.js");

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

    await setup(client);
    await transferCredits(client, 101, 102, 350);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
