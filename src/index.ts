import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();
const path = require("path");
const distPath = path.join("./client/dist");

app.use(bodyParser.json());

app.use(express.static(distPath));

app.use("/", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`
################################################
🛡️  Server listening on port: ${process.env.PORT} 🛡️
################################################
`);
});
