from flask import Flask
from flask import jsonify
from flask import request
import conn.conn as conn
import sys
import itertools
import os

# If you want to access database,
# Use conn.db().cursor()
# and if you execute SQL using cursor.execute(SQL)
# fetchone is "get one item of execute sql result"
# fetchall is "get all item of execute sql result"

# Vue and Flask rules same
# so, flask rules set diffrent
class MyFlask(Flask):
  jinja_options = Flask.jinja_options.copy()
  jinja_options.update(dict(
    block_start_string='{%',
    block_end_string='%}',
    variable_start_string='((',
    variable_end_string='))',
    comment_start_string='{#',
    comment_end_string='#}',
  ))

ROOT_PATH = os.path.dirname(os.path.abspath("__file__"))
STATIC_PATH = os.path.join(ROOT_PATH+"\\..\\", 'dist')

app = MyFlask("__name__", static_folder=STATIC_PATH, static_url_path='')

@app.after_request
def set_response_headers(r):
    r.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    r.headers['Pragma'] = 'no-cache'
    r.headers['Expires'] = '0'
    return r

# Access at localhost:5000/
# This path is root page
@app.route("/")
def index():
    return app.send_static_file("index.html")

# Access at not found page
@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file("index.html")

### GET DATA SECTION
# Get posts information of MySQL Database
@app.route("/api/posts")
def getPosts():
    cursor = conn.db().cursor()
    cursor.execute("select * from posts")
    res = cursor.fetchall()
    return jsonify(res)

@app.route("/api/portfolios")
def getPortfolios():
    cursor = conn.db().cursor()
    cursor.execute("select * from portfolios")
    res = cursor.fetchall()
    #print(res, file=sys.stdout)
    return jsonify(res)


### EDIT DATA SECTION
@app.route("/api/edit/portfolio", methods=['POST'])
def editPortfoilo():
    res = request.form.get("num")
    print(res, file=sys.stdout)
    return ""


### DELETE DATA SECITON
@app.route("/api/del/portfolio", methods=["POST"])
def delPortfolio():
    num = request.form.get("num")
    db = conn.db()
    cursor = db.cursor()
    sql = "delete from portfolios where num = %s"
    cursor.execute(sql, (num))
    db.commit()
    return ""

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)
