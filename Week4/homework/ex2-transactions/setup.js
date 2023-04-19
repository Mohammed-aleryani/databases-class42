// I modified the file based on the file from week3
const data = require("./data.json");

const setup = async (client) => {
  const hasCollection = await client
    .db("databaseWeek4")
    .listCollections({ name: "Transactions" })
    .hasNext();

  if (hasCollection) {
    const account = await client.db("databaseWeek4").collection("Transactions");
    const counter = await client.db("databaseWeek4").collection("counters");

    await account.deleteMany({});
    await counter.deleteMany({});
    await account.insertMany(data);
  } else {
    throw Error("The collection `Transactions` does not exist!");
  }
};

module.exports = {
  setup,
};
