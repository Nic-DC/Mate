import crypto from "crypto"; // built-in module in Node.js used to generate cryptographic hashes in the code

class Entry {
  constructor(title, topic, content, timestamp = Date.now()) {
    this.title = title;
    this.topic = topic;
    this.content = content;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
    this.valid = false; // Initialize the valid property to false
  }

  calculateHash() {
    const data = this.title + this.topic + this.content + this.timestamp;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  isValid() {
    // Check if the entry has a hash and timestamp
    if (!this.hash || !this.timestamp) {
      console.log("Entry is missing hash or timestamp");
      return false;
    }

    // Check if required fields are present
    if (this.title === "" || this.topic === "" || this.content === "" || !this.timestamp) {
      console.log("Entry is missing required fields");
      return false;
    }

    const newHash = this.calculateHash();
    if (newHash !== this.hash) {
      console.log(`Entry hash is invalid: ${newHash} !== ${this.hash}`);
      return false;
    }

    console.log(`Entry ${this.title} is valid`);
    return true;
  }

  // isValid() {
  //   // Check if the entry has a hash and timestamp
  //   if (!this.hash || !this.timestamp) {
  //     console.log("Entry is missing hash or timestamp");
  //     this.valid = false;
  //     return false;
  //   }

  //   const calculatedHash = this.calculateHash();
  //   if (calculatedHash !== this.hash) {
  //     console.log(`Entry hash is invalid: ${calculatedHash} !== ${this.hash}`);
  //     this.valid = false;
  //     return false;
  //   }

  //   if (this.title === "" || this.topic === "" || this.content === "" || !this.timestamp) {
  //     console.log("Entry is missing required fields");
  //     this.valid = false;
  //     return false;
  //   }

  //   console.log(`Entry ${this.title} is valid`);
  //   this.valid = true;
  //   return true;
  // }

  // isValid() {
  //   const calculatedHash = this.calculateHash();
  //   if (calculatedHash !== this.hash) {
  //     console.log(`Entry hash is invalid: ${calculatedHash} !== ${this.hash}`);
  //     this.valid = false;
  //     return false;
  //   }
  //   if (this.title === "" || this.topic === "" || this.content === "" || !this.timestamp) {
  //     console.log("Entry is missing required fields");
  //     this.valid = false;
  //     return false;
  //   }
  //   console.log(`Entry ${this.title} is valid`);
  //   this.valid = true;
  //   return true;
  // }

  // update the hash value of the entry with its current timestamp
  updateHash() {
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }
}

export default Entry;

/*
    The digest() method is a method of the Hash object that is returned by 
    the createHash() method of the crypto module. It is used to generate 
    the final hash value in the specified encoding (e.g., hexadecimal, base64, etc.) 
    after all the data has been added to the hash.
    In this example, the digest() method is called with the argument "hex", 
    which specifies that the hash should be generated in hexadecimal encoding. 
    You can also use other encoding formats, such as base64 or binary, 
    by passing the corresponding argument to the digest() method.
    */
