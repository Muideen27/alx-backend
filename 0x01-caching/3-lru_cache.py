#!/usr/bin/python3
""" LRU caching """
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ LRUCache class inheriting from BaseCaching """
    def __init__(self):
        """ Initialize class """
        super().__init__()
        self.store = {}
        self.recent = 0

    def put(self, key, item):
        """ Assign to the dictionary """
        if key and item:
            self.cache_data[key] = item
            self.store[key] = self.recent
            self.recent += 1
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            val = self.recent
            # find the key with the lowest recent value
            for ky in self.store:
                vl = self.store[ky]
                if vl < val:
                    val = vl
                    key = ky
            print("DISCARD: {}".format(key))
            # remove the key from cache and store
            self.cache_data.pop(key)
            self.store.pop(key)

    def get(self, key):
        """ Return the value linked """
        if key is None or self.cache_data.get(key) is None:
            return None
        self.store[key] = self.recent
        self.recent += 1
        return self.cache_data.get(key)
