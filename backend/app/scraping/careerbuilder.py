
from .util import Util
from .scraper import Scraper


class CareerBuilderScrepe(Scraper):
    DOMAIN = "https://www.careerbuilder.com"
    args_scraper = {"class": "data-results-content-parent"}
    with_headers = True

    def scrape_description(self, job):
        job_desc = self.scrape(job["link"],
                               {"class": "data-display-container"})
        if len(job_desc) == 0:

            return None
        desc = job_desc[0].find("p")
        req = job_desc[0].find(True, {"class": "bloc"})
        # or (tag.name == "div" and tag.get("class") == "bloc")]
        return str(desc)+str(req)

    def scrape_jobs(self):
        for job in self.data:
            link = job.find(True, {"class": "job-listing-item"})["href"]
            url = self.DOMAIN+link
            title = Util.get_att(
                job.find(True, {"class": "data-results-title"}), "text")
            summary = Util.get_att(
                job.find(True, {"class": "show-mobile"}), "text")
            enterprise = Util.get_att(
                job.find(True, {"class": "data-details"}), "text")
            sn = job.find_all(lambda tag: tag.name ==
                              "div" and tag.get("class") == ["data-snapshot"])
            if len(sn) > 0:
                salary = sn[0].find(lambda tag: tag.name ==
                                    "div" and tag.get("class") == ["block"])
            job_description = {
                "summary": summary,
                "title": title,
                "link": url,
                "enterprise": enterprise.replace("\n", ""),
                "salary": Util.get_att(salary, "text") if salary else None,
            }
            self.jobs.append(job_description)

        self.scrape_jobs_descriptions()

        return self.jobs


# if __name__ == "__main__":
#     location = "Mexico"
#     keys = ["nodejs"]
#     query = "+".join(keys)
#     url = f"https://www.careerbuilder.com/jobs?utf8=%E2%9C%93&keywords={query}&location={location}"
#     jobs = CareerBuilderScrepe(url).scrape_jobs()
#     print(jobs)
