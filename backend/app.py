# -- coding: utf-8 --
from flask import Flask, jsonify, request, session, escape
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
import os, pymysql, hashlib, sys
import conn.conn as conn

SALT = "SSAFY_WEBMOIBILE!@"

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

# Set directory path for vue.js statis file
ROOT_PATH = os.path.dirname(os.path.abspath("__file__"))
STATIC_PATH = os.path.join(ROOT_PATH+"\\..\\", 'dist')

# Flask run at STATIC_PATH
app = MyFlask("__name__", static_folder=STATIC_PATH, static_url_path='')
api = Api(app)

# JWT is used for session
app.config['JWT_SECRET_KEY'] = "jwt-secret"
jwt_manager = JWTManager()
jwt_manager.init_app(app)

# CORS setting
cors = CORS(app, resources={
  r"/api/*": {"origin": "*"},
})


# Set no cache
@app.after_request
def set_response_headers(res):
    res.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    res.headers["Pragma"] = "no-cache"
    res.headers["Expires"] = "0"
    return res

# Access at localhost:5000/
# This path is root page
@app.route("/")
def index():
    return app.send_static_file("index.html")

# Access at not found page
@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file("index.html")


#######################################################################
########################## GET DATA SECTION ###########################
#######################################################################

# Get posts data
@app.route("/api/get/posts")
def getPosts():
    cursor = conn.db().cursor()
    cursor.execute("select * from posts order by num desc")
    result = cursor.fetchall()

    return jsonify(result)


# Get portfolio data
@app.route("/api/get/portfolios")
def getPortfolios():
    cursor = conn.db().cursor()
    cursor.execute("select * from portfolios order by num desc")
    result = cursor.fetchall()

    return jsonify(result)


# Get one user using login
@app.route("/api/login", methods=["POST"])
def login():
    umail = request.form.get("umail")
    upasswd = request.form.get("upasswd") + SALT
    upasswd = hashlib.sha256(upasswd.encode()).hexdigest()

    cursor = conn.db().cursor()
    sql = "select * from users where umail = %s and upasswd = %s"
    cursor.execute(sql, (umail, upasswd))
    result = cursor.fetchone()

    if isinstance(result, type(None)):
        return jsonify({"msg": "해당 정보가 없습니다.", "success": False})

    # Set session
    token_identity = {"umail": umail}
    accessToken = create_access_token(identity=token_identity)
    refreshToken = create_refresh_token(identity=token_identity)

    session = ({"accessToken": accessToken,
                    "refresh_token": refreshToken})

    return jsonify({"msg": "로그인 성공", "success": True, "user": result, "session": session})


# Get one user using login
@app.route("/api/logout", methods=["POST"])
def logout():
    return ""


# Get all user data
@app.route("/api/get/users")
def getUsers():
    cursor = conn.db().cursor()
    cursor.execute("select * from users")
    result = cursor.fetchall()

    return jsonify(result)


#######################################################################
########################## EDIT DATA SECTION ##########################
#######################################################################

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


# Edit post
@app.route("/api/edit/post", methods=["POST"])
def editPost():
    num = request.form.get("num")
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "update posts set title = %s, body = %s where num = %s"
    cursor.execute(sql, (title, body, num))
    db.commit()


# Edit user
@app.route("/api/edit/user", methods=["POST"])
def editUser():
    umail = request.form.get("umail")
    uauth = request.form.get("uauth")

    db = conn.db()
    cursor = db.cursor()
    sql = "update users set uauth = %s where umail = %s"
    cursor.execute(sql, (uauth, umail))
    db.commit()


#######################################################################
######################### DELETE DATA SECITON #########################
#######################################################################

# Delete portfolio
@app.route("/api/del/portfolio", methods=["POST"])
def delPortfolio():
    num = request.form.get("num")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from portfolios where num = %s"
    cursor.execute(sql, (num))
    db.commit()


# Delete post
@app.route("/api/del/post", methods=["POST"])
def delPost():
    num = request.form.get("num")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from posts where num = %s"
    cursor.execute(sql, (num))
    db.commit()


# Delete user
@app.route("/api/del/user", methods=["POST"])
def delUser():
    umail = request.form.get("umail")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from users where umail = %s"
    cursor.execute(sql, (umail))
    db.commit()


#######################################################################
######################### INSERT DATA SECITON #########################
#######################################################################

# Insert portfolios
@app.route("/api/add/portfolio", methods=["POST"])
def addPortfolio():
    author = request.form.get("author")
    title = request.form.get("title")
    body = request.form.get("body")
    img = request.form.get("img")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into portfolios (num, author, title, body, img, created_at) values(0, %s, %s, %s, %s, timestamp(now()))"
    cursor.execute(sql, (author, title, body, img))
    db.commit()


# Insert post
@app.route("/api/add/post", methods=["POST"])
def addPost():
    author = request.form.get("author")
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into posts (num, author, title, body, created_at) values(0, %s, %s, %s, timestamp(now()))"
    cursor.execute(sql, (author, title, body))
    db.commit()


# Insert user
@app.route("/api/add/user", methods=["POST"])
def addUser():
    umail = request.form.get("umail")
    upasswd = request.form.get("upasswd") + SALT
    upasswd = hashlib.sha256(upasswd.encode()).hexdigest()

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
