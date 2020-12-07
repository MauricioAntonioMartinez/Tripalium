
from pymongo import MongoClient
import logging as log
import os

MONGO_URI = os.environ.get("MONGO_URI")


class MongoAPI:
    def __init__(self):
        self.instance = MongoClient(MONGO_URI)
        print("CONNECTED TO THE DATABASE")

        db = self.instance["jobs"]
        self.collection = db["job"]
    

    def read(self):
        documents = self.collection.find()
        jobs = [{job: data[job] for job in data if job != '_id'}
                  for data in documents]
        return jobs

    def write(self, data):
        response = self.collection.insert_one(data)
        output = {'Status': 'Successfully Inserted',
                  'Document_ID': str(response.inserted_id)}
        return output

    def update(self):
        updated_data = {}
        response = self.collection.update_one({}, updated_data)
        output = {'Status': 'Successfully Updated' if response.modified_count >
                  0 else "Nothing was updated."}
        return output

    def delete(self, job_id):
        response = self.collection.delete_one({"_id":job_id})
        output = {'Status': 'Successfully Deleted' if response.deleted_count >
                  0 else "Document not found."}
        return output
