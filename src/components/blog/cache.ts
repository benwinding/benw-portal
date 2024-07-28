// lib/cache.js

import flatCache from "flat-cache";
import path from "path";

const cache = flatCache.load("resultDetailsCache", path.resolve(".cache"));

export function getCachedData(key: string): any {
  return cache.getKey(key);
}

export function setCachedData(key: string, value: any) {
  cache.setKey(key, value);
  cache.save(true); // true indicates to write the cache to disk immediately
}
