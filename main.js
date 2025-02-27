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
  }

  prepend(key, value) {
    let newNode = new ListNode(key, value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
  }

  findNodeByKey(key) {
    if (this.head === null) {
      console.log("The list is empty");
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
}

class HashMap {
  constructor() {
    this.numBuckets = 16;
    this.buckets = new Array(this.numBuckets).fill(null);
    this.loadFactor = 0.75;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.numBuckets;
    }

    return hashCode;
  }

  has(key) {
    let bucketIndex = this.#hash(key);
    let bucket = this.buckets[bucketIndex];

    return bucket.findNodeByKey(key) ? true : false;
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

  set(key, value) {
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
    }

    let node = this.get(key);
    if (!node) {
      return false;
    }

    //Je pense qu'il faut récupérer la fonction find(value)
    //ça va nous donner l'index du node qu'on cherche
    //puis puis utiliser removeAt()
    //car on sait pas où est placé le node lié à key
    //mais probablement pas besoin du "out of bounds"
  }
}
