import json
import logging as log
import os

from flask import Flask, Response, jsonify, request, session
from flask_cors import CORS
from pymongo import MongoClient

from db.dbconnetion import MongoAPI
from scraping.encoder import JSONEncoder
from scraping.filter import Filter
from scraping.manager import ScraperManager

PORT = os.environ.get("PORT")
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db = MongoAPI()
app.secret_key = "sdfgsdfg"


@app.route('/', methods=['GET'])
def base():
    return Response(
        response=json.dumps(
            {"recent_searches": session.get("recent_searches")}),
        status=200,
        mimetype='application/json')


@app.route("/", methods=["POST"])
def get_cookies():
    searches_data = request.json
    if "searches" not in searches_data:
        return Response({"message": "data not provided"}, status=400)
    new_searches = [sr for sr in searches_data["searches"]]
    if not session.get("recent_searches"):
        session["recent_searches"] = []
    session["recent_searches"] = session.get("recent_searches") + new_searches
    return {"recent_searches": session.get("recent_searches")}



@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.json
    if "keywords" not in data:
        return Response(
            response=json.dumps({"message": "No keywords provided"}),
            status=400)
    keywords = data["keywords"]

    if db.read_keywords(keywords):
        jobs = db.read_jobs(keywords)
        return Response(response=JSONEncoder().encode({"success":True,
        "fromCache":True,"jobs":jobs}))

    sc = ScraperManager(keywords)
    jobs = sc.main_scraping() 
    filtered_jobs = Filter(keywords).filter(jobs)
    if len(filtered_jobs) > 0:
        db.write_many([{"keywords":keywords}],"key_words")
        db.write_many(filtered_jobs,"job")
    jobs_json = [job for job in filtered_jobs]

    return Response(response=JSONEncoder().encode({"success": True
    ,"fromCache":False, "jobs": filtered_jobs}), status=200, mimetype="application/json")



@app.route('/', methods=["POST"])
def read_data():
    print(request.json)


@app.after_request
def middleware_for_response(response):
    # Allowing the credentials in the response.
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run(debug=True, port=PORT, host='0.0.0.0')
    print("Connection Stablish")
    print(f"Listen traffic through http://localhost:{PORT}")
