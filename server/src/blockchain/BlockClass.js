class Block {
  constructor(timestamp, entries, previousHash = "") {
    this.timestamp = timestamp;
    this.entries = entries;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const data = JSON.stringify(this.entries) + this.previousHash + this.timestamp + this.nonce;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }

  hasValidEntries() {
    for (const entry of this.entries) {
      if (!entry.isValid()) {
        return false;
      }
    }
    return true;
  }
}

export default Block;
