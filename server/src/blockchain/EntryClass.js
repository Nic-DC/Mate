class Entry {
  constructor(title, topic, content) {
    this.title = title;
    this.topic = topic;
    this.content = content;
    this.timestamp = Date.now();
  }

  calculateHash() {
    const data = this.title + this.topic + this.content + this.timestamp;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  isValid() {
    if (this.calculateHash() !== this.hash) {
      return false;
    }
    if (this.title === "" || this.topic === "" || this.content === "") {
      return false;
    }
    return true;
  }
}

export default Entry;
