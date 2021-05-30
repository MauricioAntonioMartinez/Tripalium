import abc
import concurrent.futures
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup

from .util import Util


class Scraper(metaclass=abc.ABCMeta):
    DOMAIN = None
    data = []
    args_scraper = {}
    jobs = []
    with_headers = False

    def __init__(self, url):
        if not url:
            raise Exception("Missing scraping url.")
        print(f"Scrapping url: {url}")
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

    def scrape(self, url, args, tag=True):
        try:
            headers = {
                "headers": {
                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36",
                    "User-Agent":
                    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.3"
                }
            }
            headers = headers if self.with_headers else {}
            res = Request(url=url, **headers)
            html = urlopen(res).read()
            bs = BeautifulSoup(html, 'html.parser')
            return bs.find_all(True if type(tag) == bool else tag, args)
        except Exception as e:
            print("REQUEST FAILED")
            print(e)
            return []
