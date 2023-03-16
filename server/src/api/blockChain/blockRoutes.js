import { Router } from "express";
import Journal from "../journal/journalModel.js";
import Entry from "../../blockchain/EntryClass.js";
import myBlockchain from "./sharedBlockchain.js";

const blockchainRoutes = new Router();

async function processEntries(journals, myBlockchain) {
  const validatedJournals = [];

  for (const journal of journals) {
    const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
    const isValid = await myBlockchain.isEntryValid(entry);
    let blockHash = "Not found";

    if (isValid) {
      const block = await myBlockchain.findBlockByEntryHash(entry.hash);
      if (block) {
        console.log("block:", block);
        const blockEntry = block.entries.find((e) => e.hash === entry.hash);
        console.log("blockEntry:", blockEntry);
        blockHash = block.hash;
      } else {
        console.log("block:", null);
      }
    }

    const entryObject = {
      title: entry.title,
      topic: entry.topic,
      content: entry.content,
      timestamp: entry.timestamp,
      hash: entry.hash,
    };
    console.log("entryObject:", entryObject);
    validatedJournals.push({ ...entryObject, valid: isValid, blockHash });
  }

  return validatedJournals;
}

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
    const validatedJournals = await processEntries(journals, myBlockchain);
    res.json(validatedJournals);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default blockchainRoutes;
