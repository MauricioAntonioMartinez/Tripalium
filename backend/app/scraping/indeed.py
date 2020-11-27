from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from .util import Util
from .scraper import Scraper


class IndeedScrape(Scraper):
    DOMAIN = "https://www.indeed.com"
    args_scraper = {"class": ["jobsearch-SerpJobCard"]}

    def scrape_description(self, job):
        if not job["link"]:
            return "Link not found"
        return str(self.scrape(job["link"], {"id": "jobDescriptionText",
                                             "class": "jobsearch-jobDescriptionText"}))

    def scrape_jobs(self):
        for job in self.data:
            title = job.find(True, {"class": "jobtitle"})
            url = self.DOMAIN + title["href"] if title else None

            salary = Util.get_att(
                job.find(True, {"class": "salaryText"}), "text")
            salary_qty = Util.get_salaries(salary)
            location = Util.get_att(
                job.find(True, {"class": "location"}), "text")
            urgent = bool(job.find(True, {"class": "urgentlyHiring"}))
            summary = job.find(True, {"class": "summary"})
            aspects = [Util.get_att(asp, "text") for asp in summary.findAll(
                "li")] if summary else None
            # description_html = self.scrape(url, {"id": "jobDescriptionText"})
            job_description = {"title": str(title.text).replace('\n', '') if title else None,
                               "salary": salary,
                               "link": url,
                               "salary_qty": salary_qty,
                               "location": location,
                               "aspects_summary": aspects,
                               "urgent": urgent,
                               # "preview": f"{self.DOMAIN}{href}",
                               # "description": description_html
                               }
            self.jobs.append(job_description)

        self.scrape_jobs_descriptions()

        return self.jobs


if __name__ == '__main__':
    keys = ["react", "nodejs"]
    query = "+".join(keys)
    country = "mx"
    url = f"https://www.indeed.{country}/jobs?q={query}"
    jobs = IndeedScrape(url).scrape_jobs()
    print(jobs)
