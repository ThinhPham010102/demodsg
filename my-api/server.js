const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
