const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// middlewires
app.use(cors());
app.use(express.json());

// Api
app.get("/", (req, res) => {
    res.send(`server is running on port ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.f30vajg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        // Collections are here.
        const menuCollection = client.db("bistro-boss").collection("menu");


        app.get('/get/all/menu', async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })
        
        
        
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Bistro is running on port ${port}`);
});
