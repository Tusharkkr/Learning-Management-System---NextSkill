import express from "express";
import cors from "cors";
import "dotenv/config";

import ConnectDb from "./configs/mongodb.js";
import clerkWebhooks from "./controllers/webhooks.js";

const app = express();

await ConnectDb();

app.use(cors());

// Normal Routes
app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// Clerk Webhook Route
app.post("/clerk", express.json(), clerkWebhooks);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});