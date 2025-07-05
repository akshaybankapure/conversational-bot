class Cache {
  constructor() {
    this.cache = new Map(); // Simple in-memory cache for now
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }
}

module.exports = Cache;
