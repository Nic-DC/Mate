import { Router } from "express";
import Journal from "../journal/journalModel.js";
import Blockchain from "./blockchainModel.js";

const blockchainRoutes = new Router();

// create a new blockchain instance
let myBlockchain = new Blockchain();

blockchainRoutes.get("/", async (req, res, next) => {
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

    const journals = await Journal.find(query);
    const validatedJournals = journals.filter((journal) => {
      const entry = new Entry(journal.title, journal.topic, journal.content);
      return entry.isValid();
    });
    res.status(200).send(validatedJournals);
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "An error occurred while getting journals"));
  }
});

export default blockchainRoutes;
