
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: "./config.env"});
const uri = process.env.ATLAS_URI;
let _db;

module.exports = {
  connectToServer: function(callback){
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      _db = client.db("employees");
      console.log("Successful connection to employees collection.")
    } finally {
      // Ensures that the client will close when you finish/error
      //console.log("Closing the client")
      //await client.close();
    }
  }
  run().catch(console.dir);
  },

  getDb: function() {
    return _db;
  }
};
