



class Filter():

    def __init__(self,keywords):
        self.keywords = keywords

    def filter(self,data):
        filtered_jobs = [] 
        if not data:
            return filtered_jobs

        for job in data:

            # if not job["content"] or job["content"] == "[]":
            #     return 
            print(job["title"])
            are_in_title = any(bool(i) for i in self.keywords if i in job["title"].lower()) 

            if are_in_title:
                filtered_jobs.append(job)   
        
        return filtered_jobs

        
            