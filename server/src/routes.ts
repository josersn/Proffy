import express from "express";
import db from "./database/connection";

const routes = express.Router();

routes.post("/classes", async (req, res) => {
  const { name, avatar, whatsapp, bio, cost, schedule } = req.body;

  const user = await db("users").insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  return res.send(user);
});

export default routes;
