from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from .util import Util
from .scraper import Scraper
import concurrent.futures


class GlassdorScrape(Scraper):
    DOMAIN = "https://www.glassdoor.com.mx"
    args_scraper = {"class": "react-job-listing"}
    with_headers = True

    def scrape_description(self, job):
        content = self.scrape(
            job["link"], {"id": "JobDescriptionContainer"}, "div")
        if len(content) > 0:
            return str(content[0])
        return None

    def scrape_jobs(self):
        for job in self.data:
            enterprise = Util.get_att(job.find(
                True, {"class": "jobHeader"}).find("span"), "text")
            title = job.find(True, {"class": "jobTitle"})
            location = Util.get_att(job.find(True, {"class": "loc"}), "text")
            url = self.DOMAIN + title["href"]
            urgent = job.find(True, {"class": "hotListing"})
            urgent = True if urgent and urgent.text == "Alta demanda" else False
            job_description = {
                "title": title.text,
                "enterprise": enterprise,
                "link": url,
                "location": location,
                "urgent": urgent,
            }
            self.jobs.append(job_description)

        self.scrape_jobs_descriptions()
        return self.jobs


# if __name__ == '__main__':
#     keys = ["nodejs", "reactjs"]
#     query = "-".join(keys)
#     country = "mx"
#     url = f'https://www.glassdoor.com.{country}/Empleo/{query}-empleos-SRCH_KO0,6_KE7,16.htm'
#     jobs = GlassdorScrape(url).scrape_jobs()
#     print(jobs)
