const { MongoClient, ObjectId } = require("mongodb");

// Replace the following with your Atlas connection string
const uri = process.env.URI;
const client = new MongoClient(uri);

const dbname = "countup";
const collection_name = "scores";

const entriesCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database 🌍`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

// Get entries as array of objects
// route: GET /entries
// access: Private
const getEntries = async (req, res) => {
  try {
    await connectToDatabase();
    let result = await entriesCollection
      .find({ score: { $gte: 500 } })
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error(`Error finding entries: ${err}`);
  } finally {
    await client.close();
  }
};

// Post entries in json form
// route: POST /entries
// access: Private
const postEntries = async (req, res) => {
  try {
    await connectToDatabase();
    let result = await entriesCollection.insertOne(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(`Error inserting entry: ${err}`);
  } finally {
    await client.close();
  }
};

// Delete entries
// route: DEL /entries/:id
// access: Private
const delEntries = async (req, res) => {
  try {
    await connectToDatabase();
    let result = await entriesCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json({ message: `Deleted entry with id ${req.params.id}` });
  } catch (err) {
    console.error(`Error deleting entry: ${err}`);
  } finally {
    await client.close();
  }
};

module.exports = {
  getEntries,
  postEntries,
  delEntries,
};
