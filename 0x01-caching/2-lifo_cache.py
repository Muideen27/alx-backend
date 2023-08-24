#!/usr/bin/python3
""" LIFO caching """
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache class inheriting from BaseCaching """
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
            self.out = self.order - 2
            key = self.store[self.out]
            print("DISCARD: {}".format(key))
            self.cache_data.pop(key)

    def get(self, key):
        """ Return the value linked """
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
