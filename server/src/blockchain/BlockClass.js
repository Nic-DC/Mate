import crypto from "crypto";

class Block {
  constructor(timestamp, entries, previousHash = "") {
    this.timestamp = timestamp;
    this.entries = entries;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    let entriesHash = "";
    for (let i = 0; i < this.entries.length; i++) {
      entriesHash += this.entries[i].hash;
    }
    const data = this.timestamp + entriesHash + this.previousHash + this.nonce;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }

  isValid() {
    for (let i = 0; i < this.entries.length; i++) {
      if (!this.entries[i].isValid()) {
        console.log(`Entry ${i + 1} is invalid`);
        return false;
      }
    }

    if (this.calculateHash() !== this.hash) {
      console.log("Hash is invalid");
      return false;
    }

    return true;
  }
}

export default Block;
