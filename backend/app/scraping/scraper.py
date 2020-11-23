from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from util import Util
import concurrent.futures
import abc


class Scraper(metaclass=abc.ABCMeta):
    DOMAIN = None
    data = []
    args_scraper = {}
    jobs = []
    with_headers = False

    def __init__(self, url):
        if not url:
            raise Exception("Missing scraping url.")
        data = self.scrape(
            url, self.args_scraper)
        self.data = data

    def scrape_jobs_descriptions(self):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            """with executor.map you pass the array of futures and returns the results
                still running concurrently"""
            contents = executor.map(self.scrape_description, self.jobs)
            for index, content in enumerate(contents):
                self.jobs[index]["content"] = content

    @abc.abstractmethod
    def scrape_description(self):
        pass

    @abc.abstractmethod
    def scrape_jobs(self):
        pass

    def scrape(self, url, args):
        headers = {
            "headers": {
                'User-Agent': 'Mozilla/5.0'}
        }
        headers = headers if self.with_headers else {}
        res = Request(url=url, **headers)
        html = urlopen(res).read()
        bs = BeautifulSoup(html, 'html.parser')

        return bs.find_all(True, args)
