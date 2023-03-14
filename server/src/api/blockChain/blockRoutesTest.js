import { Router } from "express";

import Blockchain from "../../blockchain/BlockchainClass.js";
import Block from "../../blockchain/BlockClass.js";
import Entry from "../../blockchain/EntryClass.js";

const blockRoutesTest = new Router();

// create a new blockchain instance
let myBlockchain = new Blockchain();

// add some new entries to the blockchain
let entry1 = new Entry("My first entry", "Technology", "I wrote my first entry on the blockchain!");
let entry2 = new Entry("My second entry", "Politics", "I want to talk about the political climate.");
let entry3 = new Entry("My third entry", "Personal", "I'm feeling really good today!");
let entry4 = new Entry("My fourth entry", "Personality", "I'm feeling really good today4!");
let entry5 = new Entry("My fifth entry", "Personally", "I'm feeling really good today5!");
let entry6 = new Entry("My sixth entry", "Persona", "I'm feeling really good today6!");

// create a new block and add it to the blockchain
let newBlockGenesis = new Block(Date.now(), [entry1, entry2, entry3]);
let newBlock1 = new Block(Date.now(), [entry4, entry5, entry6]);
myBlockchain.addBlock(newBlockGenesis);
myBlockchain.addBlock(newBlock1);

blockRoutesTest.get("/", async (req, res, next) => {
  try {
    res.json(myBlockchain.chain);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

blockRoutesTest.get("/:index", async (req, res, next) => {
  try {
    const { index } = req.params;
    const block = myBlockchain.chain[index];
    res.json(block);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default blockRoutesTest;
