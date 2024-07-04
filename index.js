const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config();


const cors = require('cors');
const port = process.env.PORT || 12000;


// middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174','https://jute-wooden-crafts-store-ui.vercel.app'],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kybpity.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
    //   await client.connect();
      
      // Collection Names
      const craftsCollection = client.db("jute_wooden_crafts_store").collection("crafts");

      // get all crafts for display all crafts
       app.get('/crafts', async (req, res) => {
            const result = await craftsCollection.find().toArray();
            res.send(result);
       })
      
      // get single craft for craftDetails
      app.get('/crafts/:id',async (req, res) => {

          const id = req.params.id;
          console.log('ID: ', id)
          const query = { _id: new ObjectId(id) }
          const craft = await craftsCollection.findOne(query);
    
          res.send(craft)
      })
    
    
    
    
    // // get single user added crafts
    // app.get('/myArtCrafts/:email',async (req, res) => {

    //       // const email = req.params.email;
    //       // console.log('email: ', email)
    //   const query = req.params.email;
    //       const result = await craftsCollection.find(query).toArray();
    
    //       res.send(result)
    // })
    



    
    // get all contest for creator
     app.get('/myArtCrafts/:email', async (req, res) => {
            const email = req.params.email
            const query = {'creator.email': email}
            const result = await craftsCollection.find(query).toArray()
            res.send(result)
     })
    
    
    // Update Craft items
      app.get('/crafts/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) }
          const result = await craftsCollection.findOne(query);
          res.send(result);
      })
    
    
      // post or create craft item
      app.post('/crafts', async(req, res) => {
          const newCraft = req.body;
          console.log('New Craft:', newCraft);
          const result = await craftsCollection.insertOne(newCraft);
          res.send(result);
      });

      
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
 res.send('Jute & Wooden Crafts Store Server is running...')
})


app.listen(port, () => {
 console.log(`Jute & Wooden Crafts Store Server is running on port ${port}`)
})
