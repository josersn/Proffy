import express from "express";
import ClassController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionController";

const routes = express.Router();
const classesController = new ClassController();
const connectionsController = new ConnectionsController();

routes.post("/classes", classesController.store);
routes.get("/classes", classesController.index);

routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.store);

export default routes;
