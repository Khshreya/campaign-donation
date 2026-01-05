import express from "express";
import dotenv from "dotenv";
import { clerkWebhook } from "./webhooks/clerk";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Backend server is running ");
});
app.post("/webhooks/clerk", express.json(), clerkWebhook);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
