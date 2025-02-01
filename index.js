import express from "express";
const app = express();
app.use("/", (req, res) => {
  console.log("Probando la consola crack");
  res.send("Hola mundo");
});
app.listen(3000);
