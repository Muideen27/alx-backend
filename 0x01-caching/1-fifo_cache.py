#!/usr/bin/python3
""" FIFO caching """
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache class inheriting from BaseCaching """
    def __init__(self):
        """ Initialize class """
        super().__init__()
        self.store = {}
        self.order = 0
        self.out = 0

    def put(self, key, item):
        """ Assign to the dictionary """
        if key and item:
            self.cache_data[key] = item
            self.store[self.order] = key
            self.order += 1
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            key = self.store[self.out]
            print("DISCARD: {}".format(key))
            self.cache_data.pop(key)
            self.out += 1

    def get(self, key):
        """ Return the value linked """
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
