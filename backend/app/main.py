from flask import Flask, request, json, Response, jsonify, session
from pymongo import MongoClient
import logging as log
from scraping.manager import ScraperManager
from scraping.filter import Filter
from db.dbconnetion import MongoAPI
from flask_cors import CORS
import os

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
    sc = ScraperManager(keywords)
    jobs = sc.main_scraping()
    filtered_jobs = Filter(keywords).filter(jobs)

    jobs_json = [job for job in filtered_jobs]

    return Response(response=json.dumps({"success": True, "jobs": jobs_json}), status=200, mimetype="application/json")


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
