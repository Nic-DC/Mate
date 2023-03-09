import Blockchain from "./BlockchainClass.js";
import Block from "./BlockClass.js";
import Entry from "./EntryClass.js";

// create a new blockchain instance
let myBlockchain = new Blockchain();

// add some new entries to the blockchain
let entry1 = new Entry("My first entry", "Technology", "I wrote my first entry on the blockchain!");
let entry2 = new Entry("My second entry", "Politics", "I want to talk about the political climate.");
let entry3 = new Entry("My third entry", "Personal", "I'm feeling really good today!");

// create a new block and add it to the blockchain
let newBlock = new Block(Date.now(), [entry1, entry2, entry3]);
myBlockchain.addBlock(newBlock);

// check if the blockchain is valid
console.log("Is blockchain valid? " + myBlockchain.isChainValid());
