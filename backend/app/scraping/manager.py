from .glassdoor import GlassdorScrape
from .indeed import IndeedScrape
from .careerbuilder import CareerBuilderScrepe
import concurrent.futures


class ScraperManager():
    """logic to fetch in all plataforms the same query"""

    def __init__(self, keywords):
        query = "-".join(keywords)
        country = "mx"
        url_glassdor = f'https://www.glassdoor.com.{country}/Empleo/{query}-empleos-SRCH_KO0,6_KE7,16.htm'
        query = "+".join(keywords)
        url_indeed = f"https://www.indeed.com/q-react-nodejs-jobs.html?vjk=6b819f3191c070f1"
        location = "Mexico"
        url_career = f"https://www.careerbuilder.com/jobs?utf8=%E2%9C%93&keywords={query}&location={location}"

        self.career_builder = CareerBuilderScrepe(url_career)
        self.glassdoor = GlassdorScrape(url_glassdor)
        self.indeed = IndeedScrape(url_indeed)

    def main_scraping(self):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            res_1 = executor.submit(self.indeed.scrape_jobs)
            res_2 = executor.submit(self.glassdoor.scrape_jobs)
            res_3 = executor.submit(self.career_builder.scrape_jobs)

            return res_1.result() + res_2.result() + res_3.result()


if __name__ == "__main__":
    keys = ["nodejs", "reactjs"]
    sc = ScraperManager(keys)
    jobs = sc.main_scraping()
