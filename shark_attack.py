from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os
 
app = Flask(__name__)
 
# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'SharkAttack'
# COLLECTION_NAME = 'attacks'

MONGODB_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get("MONGO_DB_NAME", 'SharkAttack')
COLLECTION_NAME = os.environ.get ('MONGO_COLLECTION_NAME', 'attacks2')


 
@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")
 
 
@app.route("/SharkAttack/attacks")
def donor_projects():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """
 
    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'Case Number': True, 'Date': True,
        'Year': True, 'Type': True,
        'Country': True, 'Area': True, 'Location': True,
        'Activity': True, 'Name': True, 'Sex': True,
        'Age': True, 'Injury': True, 'Fatal': True,
        'Time': True, 'Species': True, 'Investigator or Source': True,
    }
 
    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    # with MongoClient(MONGODB_URI) as conn:
    with MongoClient(MONGODB_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=1083)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))
 
 
if __name__ == "__main__":
    app.run(debug=True)