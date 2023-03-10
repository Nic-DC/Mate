import Blockchain from "./BlockchainClass.js";
import Block from "./BlockClass.js";
import Entry from "./EntryClass.js";

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

console.log(newBlockGenesis.entries[0]);

// check if the blockchain is valid
console.log("Is blockchain valid? " + myBlockchain.isChainValid());

// create a new entry with the same data as entry#1 and the current timestamp
const entry1New = new Entry(entry1.title, entry1.topic, entry1.content);
entry1New.updateHash(); // recalculate the hash value of the new entry with the current timestamp
entry1New.hash = entry1.hash; // set the hash value to the one stored in entry#1

// check if the new entry is valid
console.log("Is entry1New valid? " + entry1New.isValid());
