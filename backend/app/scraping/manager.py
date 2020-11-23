from glassdoor import GlassdorScrape
from indeed import IndeedScrape
import concurrent.futures


class Manager():
    """logic to fetch in all plataforms the same query"""
    pass


if __name__ == "__main__":
    keys = ["nodejs", "reactjs"]
    query = "-".join(keys)
    country = "mx"
    url_glassdor = f'https://www.glassdoor.com.{country}/Empleo/{query}-empleos-SRCH_KO0,6_KE7,16.htm'
    query = "+".join(keys)
    url_indeed = f"https://www.indeed.com/q-react-nodejs-jobs.html?vjk=6b819f3191c070f1"

    glassdoor = GlassdorScrape(url_glassdor)
    indeed = IndeedScrape(url_indeed)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        res_1 = executor.submit(indeed.scrape_jobs)
        res_2 = executor.submit(glassdoor.scrape_jobs)
        print("===="*30)
        print(res_1.result())
        print("===="*30)
        print(res_2.result())
        print("===="*30)
