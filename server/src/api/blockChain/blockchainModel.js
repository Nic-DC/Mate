import Entry from "../../blockchain/EntryClass.js";
import Block from "../../blockchain/BlockClass.js";

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blockchainSchema = new Schema({
  chain: {
    type: Array,
    required: true,
  },
});
const BlockchainModel = mongoose.model("Blockchain", blockchainSchema);

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingEntries = [];
    this.maxEntriesPerBlock = 5;
    this.blockchainModel = new BlockchainModel({ chain: this.chain });
  }

  createGenesisBlock() {
    const entries = [new Entry("Genesis Entry", "Genesis", "This is the first entry of the blockchain")];
    return new Block(Date.now(), entries, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  async addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

    // Update the chain in the database
    this.blockchainModel.chain = this.chain;
    await this.blockchainModel.save();
  }

  async addEntry(entry) {
    // Check if the entry already exists in the pending entries or the chain
    const entryExists =
      this.pendingEntries.some((e) => e.hash === entry.hash) ||
      this.chain.some((block) => block.entries.some((e) => e.hash === entry.hash));

    if (!entryExists) {
      this.pendingEntries.push(entry);

      if (this.pendingEntries.length === this.maxEntriesPerBlock) {
        const newBlock = new Block(Date.now(), this.pendingEntries);
        await this.addBlock(newBlock);
        this.pendingEntries = [];
      }
    }
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.isValid() || currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  findBlockByEntryHash(hash) {
    for (const block of this.chain) {
      const entry = block.entries.find((e) => e.hash === hash);
      if (entry) {
        return block;
      }
    }
    return null;
  }

  async isEntryValid(entry) {
    // Check if the entry object is valid
    if (!entry.isValid()) {
      return false;
    }

    // Find the block containing the entry hash
    const block = this.findBlockByEntryHash(entry.hash);

    if (!block) {
      console.log(`Entry not found in the blockchain: ${entry.hash}`);
      return false;
    }

    return true;
  }
}

export default Blockchain;
