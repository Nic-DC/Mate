import crypto from "crypto"; // built-in module in Node.js used to generate cryptographic hashes in the code

class Entry {
  constructor(title, topic, content) {
    this.title = title;
    this.topic = topic;
    this.content = content;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data = this.title + this.topic + this.content + this.timestamp;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  isValid() {
    const calculatedHash = this.calculateHash();
    if (calculatedHash !== this.hash) {
      console.log(`Entry hash is invalid: ${calculatedHash} !== ${this.hash}`);
      return false;
    }
    if (this.title === "" || this.topic === "" || this.content === "" || !this.timestamp) {
      console.log("Entry is missing required fields");
      return false;
    }
    console.log(`Entry ${this.title} is valid`);
    return true;
  }

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
