import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(express.json());

app.post("/api/explain", async (req, res) => {
  const { default: handler } = await import("./api/explain.js");
  return handler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
