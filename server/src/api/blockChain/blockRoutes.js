import { Router } from "express";
import Journal from "../journal/journalModel.js";
import Blockchain from "./blockchainModel.js";
import Entry from "../../blockchain/EntryClass.js";

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
    const validatedJournals = journals.map((journal) => {
      const entry = new Entry(journal.title, journal.topic, journal.content);
      const valid = entry.isValid();
      const journalObject = journal.toObject();
      journalObject.valid = valid;
      return journalObject;
    });

    res.status(200).send(validatedJournals);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default blockchainRoutes;
