import { Router } from "express";
import Journal from "../journal/journalModel.js";
import Blockchain from "./blockchainModel.js";
import Entry from "../../blockchain/EntryClass.js";

const blockchainRoutes = new Router();

// create a new blockchain instance
let myBlockchain = new Blockchain();

// async function processEntries(journals, myBlockchain) {
//   const validatedJournals = [];

//   for (const journal of journals) {
//     const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
//     const isValid = entry.isValid();
//     let blockHash = "Not found";

//     if (isValid) {
//       const block = await myBlockchain.findBlockByEntryHash(journal.hash);
//       if (block) {
//         console.log("block:", block);
//         const blockEntry = block.entries.find((e) => e.hash === journal.hash);
//         console.log("blockEntry:", blockEntry);
//         blockHash = block.hash;
//       } else {
//         console.log("block:", null);
//       }
//     }

//     const entryObject = {
//       title: entry.title,
//       topic: entry.topic,
//       content: entry.content,
//       timestamp: entry.timestamp,
//       hash: entry.hash,
//     };
//     console.log("entryObject:", entryObject);
//     validatedJournals.push({ ...entryObject, valid: isValid, blockHash });
//   }

//   return validatedJournals;
// }

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

/* --------------- worked -----------------*/
// async function processEntries(journals, myBlockchain) {
//   const validatedJournals = [];

//   for (const journal of journals) {
//     const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
//     const isValid = entry.isValid(); // Call the isValid method from the Entry class
//     let blockHash = "Not found";

//     if (isValid) {
//       const block = await myBlockchain.findBlockByEntryHash(entry.hash);
//       if (block) {
//         console.log("block:", block);
//         const blockEntry = block.entries.find((e) => e.hash === entry.hash);
//         console.log("blockEntry:", blockEntry);
//         blockHash = block.hash;
//       } else {
//         console.log("block:", null);
//       }
//     }

//     const entryObject = {
//       title: entry.title,
//       topic: entry.topic,
//       content: entry.content,
//       timestamp: entry.timestamp,
//       hash: entry.hash,
//     };
//     console.log("entryObject:", entryObject);
//     validatedJournals.push({ ...entryObject, valid: isValid, blockHash });
//   }

//   return validatedJournals;
// }

// async function processEntries(journals, myBlockchain) {
//   const validatedJournals = [];

//   for (const journal of journals) {
//     const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
//     let blockHash = "Not found";
//     let isValid = false;

//     const block = await myBlockchain.findBlockByEntryHash(entry.hash);
//     if (block) {
//       console.log("block:", block);
//       const blockEntry = block.entries.find((e) => e.hash === entry.hash);
//       console.log("blockEntry:", blockEntry);
//       blockHash = block.hash;

//       // Check the validity of the block
//       isValid = block.isValid();
//     } else {
//       console.log("block:", null);
//     }

//     const entryObject = {
//       title: entry.title,
//       topic: entry.topic,
//       content: entry.content,
//       timestamp: entry.timestamp,
//       hash: entry.hash,
//     };
//     console.log("entryObject:", entryObject);
//     validatedJournals.push({ ...entryObject, valid: isValid, blockHash });
//   }

//   return validatedJournals;
// }

/* --------------- worked -----------------*/
// blockchainRoutes.get("/", async (req, res, next) => {
//   try {
//     const query = {};

//     if (req.query.title) {
//       const titleIncludes = req.query.title;
//       query.title = { $regex: `${titleIncludes}`, $options: "i" };
//     }

//     if (req.query.topic) {
//       const topicIncludes = req.query.topic;
//       query.topic = { $regex: `${topicIncludes}`, $options: "i" };
//     }

//     const journals = await Journal.find(query);
//     const myBlockchain = new Blockchain();
//     const validatedJournals = await processEntries(journals, myBlockchain);
//     res.json(validatedJournals);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });
// blockchainRoutes.get("/", async (req, res, next) => {
//   try {
//     const query = {};

//     if (req.query.title) {
//       const titleIncludes = req.query.title;
//       query.title = { $regex: `${titleIncludes}`, $options: "i" };
//     }

//     if (req.query.topic) {
//       const topicIncludes = req.query.topic;
//       query.topic = { $regex: `${topicIncludes}`, $options: "i" };
//     }

//     const journals = await Journal.find(query);
//     const processEntries = async () => {
//       const entryPromises = journals.map(async (journal) => {
//         const entry = new Entry(journal.title, journal.topic, journal.content);
//         if (entry.isValid()) {
//           await myBlockchain.addEntry(entry);
//         }
//         return { ...entry, tampered: !isValid };
//       });

//       const entries = await Promise.all(entryPromises);

//       console.log("myBlockchain.chain:", myBlockchain.chain);
//       const validatedJournals = journals.map((journal) => {
//         const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
//         const isValid = myBlockchain.validateEntry(entry);
//         let blockHash = "Not found";

//         if (isValid) {
//           const block = myBlockchain.findBlockByEntryHash(entry.hash);
//           if (block) {
//             console.log("block:", block);
//             const blockEntry = block.entries.find((e) => e.hash === entry.hash);
//             console.log("blockEntry:", blockEntry);
//             blockHash = block.hash;
//           } else {
//             console.log("block:", null);
//           }
//         }

//         const entryObject = entry.toObject();
//         console.log("entryObject:", entryObject);
//         return { ...entryObject, valid: isValid, blockHash };
//       });

//       res.status(200).send(validatedJournals);
//     };

//     await processEntries();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// async function checkIfEntryIsInBlockchain(entryData, myBlockchain) {
//   const entry = new Entry(entryData.title, entryData.topic, entryData.content, entryData.timestamp);
//   const block = await myBlockchain.findBlockByEntryHash(entry.hash);

//   if (block) {
//     console.log(`The entry with hash ${entry.hash} is in block ${block.hash}.`);
//     return true;
//   } else {
//     console.log(`The entry with hash ${entry.hash} is NOT in the blockchain.`);
//     return false;
//   }
// }

// checkIfEntryIsInBlockchain()

export default blockchainRoutes;

// const validatedJournals = journals.map((journal) => {
//   const entry = new Entry(journal.title, journal.topic, journal.content, journal.timestamp);
//   const block = myBlockchain.chain.find((block) => block.entries.some((e) => e.hash === entry.hash));

//   console.log("block:", block);

//   const blockEntry = block ? block.entries.find((e) => e.hash === entry.hash) : null;

//   console.log("entry:", entry);
//   console.log("blockEntry:", blockEntry);

//   const valid =
//     blockEntry &&
//     blockEntry.hash === entry.hash &&
//     blockEntry.data.title === journal.title &&
//     blockEntry.data.topic === journal.topic &&
//     blockEntry.data.content === journal.content;

//   console.log("valid:", valid);

//   const blockHash = block ? block.hash : "Not found";
//   return { ...journal.toObject(), valid, blockHash };
// });
