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

//   calculateHash() {
//     const data = this.timestamp + JSON.stringify(this.entries) + this.previousHash + this.nonce;
//     let entriesHash = "";
//     for (let i = 0; i < this.entries.length; i++) {
//       entriesHash += this.entries[i].hash;
//     }
//     data += entriesHash;
//     return crypto.createHash("sha256").update(data).digest("hex");
//   }

// import crypto from "crypto";

// class Block {
//   constructor(timestamp, entries, previousHash = "") {
//     this.timestamp = timestamp;
//     this.entries = entries;
//     this.previousHash = previousHash;
//     this.nonce = 0;
//     this.hash = this.calculateHash();
//   }

//   calculateHash() {
//     const data = this.timestamp + JSON.stringify(this.entries) + this.previousHash + this.nonce;
//     return crypto.createHash("sha256").update(data).digest("hex");
//   }

//   mineBlock(difficulty) {
//     while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
//       this.nonce++;
//       this.hash = this.calculateHash();
//     }
//     console.log("Block mined: " + this.hash);
//   }

//   isValid() {
//     for (let i = 0; i < this.entries.length; i++) {
//       if (!this.entries[i].isValid()) {
//         console.log(`Entry ${i + 1} is invalid`);
//         return false;
//       }
//     }

//     if (this.calculateHash() !== this.hash) {
//       console.log("Hash is invalid");
//       return false;
//     }

//     return true;
//   }
// }

// export default Block;

// import crypto from "crypto";

// class Block {
//   constructor(timestamp, entries, previousHash = "") {
//     this.timestamp = timestamp;
//     this.entries = entries;
//     this.previousHash = previousHash;
//     this.hash = this.calculateHash();
//     this.nonce = 0;
//   }

//   calculateHash() {
//     const data = JSON.stringify(this.entries) + this.previousHash + this.timestamp + this.nonce;
//     return crypto.createHash("sha256").update(data).digest("hex");
//   }

//   mineBlock(difficulty) {
//     while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
//       this.nonce++;
//       this.hash = this.calculateHash();
//     }
//     console.log("Block mined: " + this.hash);
//   }

//   hasValidEntries() {
//     for (const entry of this.entries) {
//       if (!entry.isValid()) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// export default Block;
