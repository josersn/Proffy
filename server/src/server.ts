import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hello World from port 3333")
});

app.listen(3333, () => {
  console.log("serve running in port 3333");
});
