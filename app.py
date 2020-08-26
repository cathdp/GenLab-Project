import os
import pandas as pd
import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import psycopg2
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:7540240@localhost:5432/lab_data"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
print(Base.classes)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/about")
def about():
    """Return the homepage."""
    return render_template("about.html")

@app.route("/contact")
def contact():
    """Return the homepage."""
    return render_template("contact.html")

@app.route("/api/v1.0/table2")
def table2():
    """Return table data"""
    stmt = "select * from general_lab"
    with db.engine.connect() as con:
        result = con.execute(stmt)
    return json.dumps([dict(r) for r in result])

@app.route("/api/v1.0/table")
def table():
    """Return table data"""
    
    
    stmt="select * from general_lab"
    df = pd.read_sql_query(stmt, db.session.bind)
    data_js={
    "location":list(df['location'].values),
    "test":list(df['test'].values),
    "january":list(df['january'].values),
    "february":list(df['february'].values),
    "march":list(df['march'].values),
    "april":list(df['april'].values),
    "total":list(df['total'].values)
    }
    return jsonify(data_js)

@app.route("/api/v1.1/table")
def table_1():
    """Return table data"""

    stmt_1="select * from blood_bank"
    df_1 = pd.read_sql_query(stmt_1, db.session.bind)
    data_js_bb={
    "order":list(df_1['Order Number'].values),
    "order_data":list(df_1['Order DTTM'].values),
    "test":list(df_1['test'].values),
    "test_name":list(df_1['Test Name'].values),
    "ward":list(df_1['ward'].values),
    "site":list(df_1['site'].values),
    "location":list(df_1['location'].values)
    }

    return jsonify(data_js_bb)

@app.route("/locations")
def locations():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = "select distinct(location) from general_lab"
    df = pd.read_sql_query(stmt, db.session.bind)
    location_dic = {
        "locations": [i[0] for i in df.values]
    }
    
    # Return a list of the column names (sample names)
    return jsonify(location_dic)
    
@app.route("/tests")
def tests():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = "select distinct(test) from general_lab order by 1"
    df = pd.read_sql_query(stmt, db.session.bind)
    location_dic = {
        "tests": [i[0] for i in df.values]
    }
  
    # Return a list of the column names (sample names)
    return jsonify(location_dic)

if __name__ == "__main__":
    app.run(debug=True)
