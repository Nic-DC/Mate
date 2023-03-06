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

roomsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Rooms.findOneAndDelete({ roomId: id });

    if (!deletedRoom) {
      res.status(404).send({ message: `Room with ID ${id} not found` });
    } else {
      res.status(200).send({ message: `Room with ID ${id} deleted successfully` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default roomsRouter;
