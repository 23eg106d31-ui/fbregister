const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const path = require("path");

const app = express();
dotenv.config();

const uri = process.env.MONGODB_URI;

// Path to the downloaded Atlas CA certificate
// const caPath = path.join(__dirname, "rds-combined-ca-bundle.pem");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  //tlsCAFile: caPath, // <-- ensures proper TLS handshake
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("🍃 Connected to MongoDB successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
}
connectDB();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "fbreg.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
