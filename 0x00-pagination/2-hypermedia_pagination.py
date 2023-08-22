#!/usr/bin/env python3
""" module for Server class"""


import csv
import math
from typing import List, Dict


def index_range(page: int, page_size: int) -> tuple:
    ''' start to end of last index page '''
    if page < 1 or page_size < 1:
        return (0, 0)
    last: int = page_size * page
    return (last - page_size, last)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        ''' method to return page '''
        assert type(page) is int and type(page_size) is int
        assert page > 0 and page_size > 0
        lst = self.dataset()
        start, end = index_range(page, page_size)
        if start > len(lst) or end >= len(lst):
            return []
        return lst[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        '''
        method that returns a dictionary containing the following dict
            page_size: the length of the returned dataset page
            page: the current page number
            data: the dataset page (equivalent to return from previous task)
            next_page: number of the next page, None if no next page
            prev_page: number of the previous page, None if no previous page
            total_pages: the total number of pages in the dataset as an integer
        '''
        dct = {}
        data = self.get_page(page, page_size)
        dct['page_size'] = len(data)
        dct['page'] = page
        dct['data'] = data
        if self.get_page(page + 1, page_size) != []:
            dct['next_page'] = dct['page'] + 1
        else:
            dct['next_page'] = None
        try:
            self.get_page(page - 1, page_size)
        except Exception:
            dct['prev_page'] = None
        else:
            dct['prev_page'] = dct['page'] - 1
        dct['total_pages'] = math.ceil((len(self.__dataset) - 1) / page_size)
        return dct
