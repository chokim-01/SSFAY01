from flask import Flask
from flask import jsonify
from flask import request
from flask import session
from flask import escape
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
import pymysql
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
app.config['JWT_SECRET_KEY'] = 'jwt-secret'
api = Api(app)
jwt_manager = JWTManager()
jwt_manager.init_app(app)

# CORS setting
cors = CORS(app, resources={
  r"/api/*": {"origin": "*"},
})


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

# Get posts data
@app.route("/api/posts")
def getPosts():
    cursor = conn.db().cursor()
    cursor.execute("select * from posts order by num desc")
    res = cursor.fetchall()
    return jsonify(res)


# Get portfolio data
@app.route("/api/portfolios")
def getPortfolios():
    cursor = conn.db().cursor()
    cursor.execute("select * from portfolios order by num desc")
    res = cursor.fetchall()
    return jsonify(res)

# Get one user using login
@app.route("/api/login", methods=["POST"])
def login():
    umail = request.form.get("umail")
    upasswd = request.form.get("upasswd")

    cursor = conn.db().cursor()
    sql = "select * from users where umail = %s and upasswd = %s"
    cursor.execute(sql, (umail, upasswd))
    res = cursor.fetchone()

    if len(res) == 0:
        return jsonify({"msg": "해당 정보가 없습니다.", "success": False})


    # Set session
    token_identity = {"umail": umail}
    accessToken = create_access_token(identity=token_identity)
    refreshToken = create_refresh_token(identity=token_identity)

    session = ({'accessToken': accessToken,
                    'refresh_token': refreshToken})

    return jsonify({"msg": "로그인 성공", "success": True, "user": res, "session": session})

# Get one user using login
@app.route("/api/logout", methods=["POST"])
def logout():
    return ""


# Get all user data
@app.route("/api/users")
def getUsers():
    cursor = conn.db().cursor()
    cursor.execute("select * from users")
    res = cursor.fetchall()
    return jsonify(res)


### EDIT DATA SECTION

# Edit portfolio
@app.route("/api/edit/portfolio", methods=['POST'])
def editPortfoilo():
    num = request.form.get("num")
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "update portfolios set title = %s, body = %s where num = %s"
    cursor.execute(sql, (title, body, num))
    db.commit()

    return ""


# Edit post
@app.route("/api/edit/post", methods=["POST"])
def editPost():
    num = request.form.get("num")
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "update posts set title = %s, body = %s where num = %s"
    cursor.execute(sql, (title,body,num))
    db.commit()

    return ""


### DELETE DATA SECITON

# Del portfolio
@app.route("/api/del/portfolio", methods=["POST"])
def delPortfolio():
    num = request.form.get("num")
    db = conn.db()
    cursor = db.cursor()
    sql = "delete from portfolios where num = %s"
    cursor.execute(sql, (num))
    db.commit()
    return ""


# Del post
@app.route("/api/del/post", methods=["POST"])
def delPost():
    num = request.form.get("num")
    db = conn.db()
    cursor = db.cursor()
    sql = "delete from posts where num = %s"
    cursor.execute(sql, (num))
    db.commit()
    return ""


# Del user
@app.route("/api/del/user", methods=["POST"])
def delUser():
    email = request.form.get("umail")
    db = conn.db()
    cursor = db.cursor()
    sql = "delete from users where umail = %s"
    cursor.execute(sql, (email))
    db.commit()
    return ""


# INSERT DATA SECITON

# Insert portfolios
@app.route("/api/add/portfolio", methods=["POST"])
def addPortfolio():
    title = request.form.get("title")
    body = request.form.get("body")
    img = request.form.get("img")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into portfolios (num, title, body, img, created_at) values(0, %s, %s, %s, timestamp(now()))"
    cursor.execute(sql, (title, body, img))
    db.commit()
    return ""


# Insert post
@app.route("/api/add/post", methods=["POST"])
def addPost():
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into posts (num, title, body, created_at) values(0, %s, %s, timestamp(now()))"
    cursor.execute(sql, (title,body))
    db.commit()
    return ""


# Insert user
@app.route("/api/add/user", methods=["POST"])
def addUser():
    umail = request.form.get("umail")
    upasswd = request.form.get("upasswd")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into users (umail, upasswd, uauth) values(%s, %s, 0)"

    try:
        cursor.execute(sql, (umail, upasswd))
    except pymysql.err.IntegrityError as e:
        return jsonify({"msg": "중복된 계정입니다."})

    db.commit()

    return jsonify({"msg" : "가입완료!"})

if __name__ == "__main__":
  app.run(host="localhost", debug=True)
