const mongoose = require('mongoose');

const mongoURI = 'mongodb://rohansabale125:rohananu125@ac-7r4msrh-shard-00-00.ghx2kuu.mongodb.net:27017,ac-7r4msrh-shard-00-01.ghx2kuu.mongodb.net:27017,ac-7r4msrh-shard-00-02.ghx2kuu.mongodb.net:27017/workwavemern?ssl=true&replicaSet=atlas-v4h4d0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }); // Remove unnecessary callback argument
    console.log("Connected to MongoDB successfully!");
    const fetchedData = await mongoose.connection.db.collection("workers").find({}).toArray();
    const catData = await mongoose.connection.db.collection("workerscategory").find({}).toArray();
    global.workers = fetchedData;
    global.workerscategory=catData;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Optional: Exit the process on connection failure
  }
};

module.exports = mongoDB;
