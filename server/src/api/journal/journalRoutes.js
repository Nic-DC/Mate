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

journalRoutes.get("/filtered", async (req, res, next) => {
  try {
    const query = {};

    if (req.query.title) {
      const titleIncludes = req.query.title;
      query.title = { $regex: `${titleIncludes}`, $options: "i" };
    }

    if (req.query.topic) {
      const topicIncludes = req.query.topic;
      query.topic = { $regex: `${topicIncludes}`, $options: "i" };
    }

    const journals = await Journal.find(query, { title: 1, topic: 1, content: 1 });
    res.status(200).send(journals);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while getting journals"));
  }
});

export default journalRoutes;
