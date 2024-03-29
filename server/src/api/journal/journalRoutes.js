import { Router } from "express";
import Journal from "./journalModel.js";
import Entry from "../../blockchain/EntryClass.js";
import { getPdfReadableStream } from "../../lib/tools/pdf-tools.js";
import myBlockchain from "../blockChain/sharedBlockchain.js";
import { pipeline } from "stream";

const journalRoutes = new Router();

journalRoutes.post("/entries", async (req, res, next) => {
  try {
    const { title, topic, content } = req.body;
    const entry = new Entry(title, topic, content);

    if (await myBlockchain.isEntryValid(entry)) {
      console.log("Entry is valid");
      const newBlock = await myBlockchain.addEntryToBlockchain(entry);
      console.log("New block:", newBlock);

      const journalEntry = new Journal({
        title: entry.title,
        topic: entry.topic,
        content: entry.content,
        hash: entry.hash,
        timestamp: entry.timestamp,
      });

      await journalEntry.save();
      res.status(201).json(journalEntry);
    } else {
      res.status(400).json({ message: "Invalid entry" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Problem with POST journalEntry entry" });
  }
});

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

journalRoutes.put("/journal/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedJournal = await Journal.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedJournal) {
      res.send({ updatedJournal });
    } else {
      res.status(404).send({ notFound: `Journal with id: ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

journalRoutes.delete("/journal/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedJournal = await Journal.findByIdAndDelete(id);
    if (deletedJournal) {
      res.send({ message: "Journal deleted successfully" });
    } else {
      res.status(404).send({ notFound: `Journal with id: ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// PDF - DOWNLOAD
journalRoutes.get("/journal/:id/pdf", async (req, res, next) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);
    // console.log("user", user);

    if (journal) {
      res.setHeader("Content-Disposition", "attachment; journal.pdf");

      const source = getPdfReadableStream(journal);
      const destination = res;

      pipeline(source, destination, (err) => {
        if (err) console.log(err);
      });
    } else {
      console.log(`There is no journal with this id: ${id}`);
    }
  } catch (error) {
    next(error);
  }
});

export default journalRoutes;
