import { Router } from "express";
import Journal from "./journalModel.js";

const journalRoutes = new Router();

journalRoutes.post("/", async (req, res, next) => {
  try {
    const journal = new Journal(req.body);
    await journal.save();

    if (journal) {
      res.status(201).send({ journal });
    } else {
      next({ message: `problem wiht POST journal entry` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

journalRoutes.get("/", async (req, res, next) => {
  try {
    const journals = await Journal.find();
    res.status(200).send(journals);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default journalRoutes;
