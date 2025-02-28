class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  prepend(key, value) {
    let newNode = new ListNode(key, value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
      this.size++;
    }
  }

  findNodeByKey(key) {
    if (this.head === null) {
      return null;
    }
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  removeNodeByKey(key) {
    if (!this.head) {
      return false;
    }

    if (this.head.key === key) {
      this.head = this.head.nextNode;
      this.size--;
      if (this.head === null) {
        this.tail = null;
        this.size = 0;
      }
      return true;
    }

    let currentNode = this.head;
    while (currentNode.nextNode && currentNode.nextNode.key !== key) {
      currentNode = currentNode.nextNode;
    }

    if (currentNode.nextNode && currentNode.nextNode.key === key) {
      if (currentNode.nextNode === this.tail) {
        this.tail = currentNode;
        this.size--;
        return true;
      } else {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        this.size--;
        return true;
      }
    } else {
      return false;
    }
  }
}

class HashMap {
  constructor() {
    this.numBuckets = 16;
    this.buckets = new Array(this.numBuckets).fill(null);
    this.loadFactor = 0.75;
  }

  #hash(key) {
    let hashCode = 0;

    let stringKey;
    if (typeof key === "object") {
      stringKey = JSON.stringify(key);
    } else {
      stringKey = key.toString();
    }

    const primeNumber = 31;
    for (let i = 0; i < stringKey.length; i++) {
      hashCode =
        (primeNumber * hashCode + stringKey.charCodeAt(i)) % this.numBuckets;
    }

    return hashCode;
  }

  has(key) {
    let bucketIndex = this.#hash(key);
    let bucket = this.buckets[bucketIndex];

    return bucket && bucket.findNodeByKey(key) ? true : false;
  }

  get(key) {
    let bucketIndex = this.#hash(key);
    let bucket = this.buckets[bucketIndex];

    if (!bucket) {
      return null;
    }

    let node = bucket.findNodeByKey(key);
    return node ? node.value : null;
  }

  #resize() {
    const oldBuckets = this.buckets;
    this.numBuckets *= 2;
    this.buckets = new Array(this.numBuckets).fill(null);

    oldBuckets.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      let currentNode = bucket.head;
      while (currentNode) {
        this.set(currentNode.key, currentNode.value);
        currentNode = currentNode.nextNode;
      }
    });
  }

  set(key, value) {
    if (this.length() >= this.loadFactor * this.numBuckets) {
      this.#resize();
    }

    let bucketIndex = this.#hash(key);
    let bucket = this.buckets[bucketIndex];

    if (bucket === null) {
      bucket = new LinkedList();
      this.buckets[bucketIndex] = bucket;
    }

    let node = bucket.findNodeByKey(key);
    if (!node) {
      bucket.prepend(key, value);
    } else {
      node.value = value;
    }
  }

  remove(key) {
    let bucketIndex = this.#hash(key);
    let bucket = this.buckets[bucketIndex];

    if (bucket === null) {
      return false;
    } else {
      return bucket.removeNodeByKey(key);
    }
  }

  length() {
    let length = 0;
    for (let bucket of this.buckets) {
      if (bucket) {
        length += bucket.size;
      }
    }
    return length;
  }

  clear() {
    this.buckets = new Array(this.numBuckets).fill(null);
  }

  keys() {
    let keysArray = [];
    this.buckets.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      let currentNode = bucket.head;
      while (currentNode) {
        keysArray.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    });
    return keysArray;
  }

  values() {
    let valuesArray = [];
    this.buckets.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      let currentNode = bucket.head;
      while (currentNode) {
        valuesArray.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    });
    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    this.buckets.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      let currentNode = bucket.head;
      while (currentNode) {
        entriesArray.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    });
    return entriesArray;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.length());
