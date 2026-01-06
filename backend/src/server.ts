import express from "express";
import profileRoutes from "./routes/profile";

const app = express();

app.use(express.json());

app.use("/api", profileRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
