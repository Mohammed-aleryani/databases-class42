async function transferCredits(client, fromAccountId, toAccountId, amount) {
  const accountsCollection = client
    .db("databaseWeek4")
    .collection("Transactions");
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      await accountsCollection.updateOne(
        { account_number: fromAccountId },
        {
          $inc: { balance: amount * -1 },
          $push: {
            account_changes: {
              $each: [
                { amount: amount * -1 },
                { changed_date: new Date() },
                { remark: "House rent" },
              ],
            },
          },
        },
        { session }
      );
      await accountsCollection.updateOne(
        { account_number: toAccountId },
        {
          $inc: { balance: amount },

          $push: {
            account_changes: {
              $each: [
                { amount: amount },
                { changed_date: new Date() },
                { remark: "House rent" },
              ],
            },
          },
        },
        { session }
      );
    });
  } catch (err) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}

module.exports = {
  transferCredits,
};

/*

For making change_number auto incremented I use blow function in Triggers inside mongodb atlas.

exports = async function(changeEvent) {
    var docId = changeEvent.fullDocument._id;
    
    const countercollection = context.services.get("Cluster0").db(changeEvent.ns.db).collection("counters");
    const studentcollection = context.services.get("Cluster0").db(changeEvent.ns.db).collection(changeEvent.ns.coll);
    
    var counter = await countercollection.findOneAndUpdate({_id: changeEvent.ns },{ $inc: { seq_value: 1 }}, { returnNewDocument: true, upsert : true});
    var updateRes = await studentcollection.updateOne({_id : docId},{ $push :{account_changes: {change_number : counter.seq_value}}});
    
    }; 

*/
