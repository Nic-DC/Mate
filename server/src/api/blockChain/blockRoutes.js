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
    const processEntries = async () => {
      const entryPromises = journals.map(async (journal) => {
        const entry = new Entry(journal.title, journal.topic, journal.content);
        if (entry.isValid()) {
          await myBlockchain.addEntry(entry);
        }
        return entry;
      });

      const entries = await Promise.all(entryPromises);

      const validatedJournals = entries.map((entry) => {
        const valid = entry.isValid();
        const block = myBlockchain.chain.find((block) => block.entries.some((e) => e.hash === entry.hash));
        const blockHash = block ? block.hash : "Not found";
        return { ...entry, valid, blockHash };
      });

      res.status(200).send(validatedJournals);
    };

    await processEntries();
    // const processEntries = async () => {
    //   for (const journal of journals) {
    //     const entry = new Entry(journal.title, journal.topic, journal.content);
    //     if (entry.isValid()) {
    //       await myBlockchain.addEntry(entry);
    //     }
    //   }
    // };

    // await processEntries();

    // const validatedJournals = journals.map((journal) => {
    //   const entry = new Entry(journal.title, journal.topic, journal.content);
    //   const valid = entry.isValid();
    //   const block = myBlockchain.chain.find((block) => block.entries.some((e) => e.hash === entry.hash));
    //   const blockHash = block ? block.hash : "Not found";
    //   return { ...journal.toObject(), valid, blockHash };
    // });

    // res.status(200).send(validatedJournals);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default blockchainRoutes;
// const validatedJournals = journals.map((journal) => {
//   const entry = new Entry(journal.title, journal.topic, journal.content);
//   const valid = entry.isValid();
//   const journalObject = journal.toObject();
//   journalObject.valid = valid;
//   return journalObject;
// });
