
import logging as log
import os

from pymongo import MongoClient

MONGO_URI = os.environ.get("MONGO_URI")


class MongoAPI:
    def __init__(self):
        self.instance = MongoClient(MONGO_URI)
        print("CONNECTED TO THE DATABASE")

        db = self.instance["jobs"]
        self.collection_jobs = db["job"]
        self.collection_keywords = db["key_words"]
    

    def read_jobs(self,kw):
        documents = self.collection_jobs.find({"keywords":{"$all":kw}})
        jobs = [{job: data[job] for job in data if job != '_id'}
                  for data in documents]
        return jobs
 
    def read_keywords(self,kw):
        docs = self.collection_keywords.find({"keywords":{"$all":kw}})
        elements = [{key:data[key] for key in data if key != "_id"} for data in docs]

        if len(elements)>0:
            return True
        return False

    def write(self, data):
        response = self.collection_jobs.insert_one(data)
        output = {'Status': 'Successfully Inserted',
                  'Document_ID': str(response.inserted_id)}
        return output

    def write_many(self,data,collection):
        if collection == "job":
            self.collection_jobs.insert_many(data)
        else:
            self.collection_keywords.insert_many(data)
        

    def update(self):
        updated_data = {}
        response = self.collection_jobs.update_one({}, updated_data)
        output = {'Status': 'Successfully Updated' if response.modified_count >
                  0 else "Nothing was updated."}
        return output

    def delete(self, job_id):
        response = self.collection_jobs.delete_one({"_id":job_id})
        output = {'Status': 'Successfully Deleted' if response.deleted_count >
                  0 else "Document not found."}
        return output
