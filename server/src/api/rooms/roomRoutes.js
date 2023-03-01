import { Router } from "express";
import Rooms from "./roomModel.js";

const roomsRouter = new Router();

roomsRouter.get("/", async (req, res, next) => {
  try {
    const rooms = await Rooms.find();

    if (rooms.length > 0) {
      res.status(200).send(rooms);
    } else {
      res.send({ message: `There are no rooms in the db` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default roomsRouter;
