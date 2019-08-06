# -- coding: utf-8 --
from flask import Flask, jsonify, request, session, escape
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from pyfcm import FCMNotification
import os, pymysql, hashlib, sys, time, threading
import conn.conn as conn

push_service = FCMNotification(api_key="AAAAg4OB7Yk:APA91bFPb7kkVePgoWGDOfauKSBw45b5GwlV1qbo9XgLISbBRFI-t_LeZ-Pnu2q34vTMgtyWwFnBomUsoku_HA2Y5Kw0floMAtd4KzJiCPd7oP-3VpmYF5X9wg20vOF7lcTbvAHhBM94")
# log file path
LOG_PATH = "./log/log"

# Hash slat for user passwd sha256
SALT = "SSAFY_WEBMOIBILE!@"

# Prevent deadlock at write log
lock = threading.Lock()

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
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt_manager = JWTManager()
jwt_manager.init_app(app)

blacklist = set()


# CORS setting
cors = CORS(app, resources={
  r"/api/*": {"origin": "*"},
})

# If user logout, session value insert blacklist
@jwt_manager.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


# If client user refresh page reconnect
@app.route('/api/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    ret = {
        "access_token": create_access_token(identity=current_user)
    }
    return ""


# Set no cache
@app.after_request
def set_response_headers(res):
    res.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    res.headers["Pragma"] = "no-cache"
    res.headers["Expires"] = "0"
    return res

# Get client user ip
def get_ip_addr():
    return request.environ.get("HTTP_X_REAL_IP", request.remote_addr)


# Get current time
def get_current_time():
    now = time.localtime()
    return "%04d/%02d/%02d %02d:%02d:%02d" % (now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec)


# Add log
def add_log(action, who):
    lock.acquire()
    f = open(LOG_PATH, "a")
    f.write(get_current_time() + "$" + action + "$" + who + "$" + get_ip_addr() + "\n")
    f.close()
    lock.release()
    return ""


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

# Get user post write push
@app.route("/api/push")
def post_push():
    cursor = conn.db().cursor()
    cursor.execute("select devicetoken from devicetokens")
    push_tokens = cursor.fetchall()
    tokens = []
    for i in range(len(push_tokens)):
        tokens.append(push_tokens[i]["devicetoken"])

    result = push_service.notify_multiple_devices(registration_ids=tokens,message_title="dltlqkf",message_body="메세지")
    print(result)
    return ""

# Get posts data
@app.route("/api/get/posts")
def get_posts():
    cursor = conn.db().cursor()
    cursor.execute("select * from posts order by num desc")
    result = cursor.fetchall()

    return jsonify(result)


# Get portfolio data
@app.route("/api/get/portfolios")
def get_portfolios():
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
                    "refreshToken": refreshToken})

    add_log("Login", umail)

    return jsonify({"msg": "로그인 성공", "success": True, "user": result, "session": session})


# Get one user using login
@app.route("/api/logout", methods=["POST"])
def logout():
    umail = request.form.get("umail")
    add_log("Logout", umail)

    return ""


# Get all user data
@app.route("/api/get/users")
def get_users():
    cursor = conn.db().cursor()
    cursor.execute("select * from users")
    result = cursor.fetchall()

    return jsonify(result)


@app.route("/api/get/logs")
def get_logs():
    lock.acquire()
    f = open(LOG_PATH, "r")

    logs = []
    while True:
        line = f.readline()
        if not line: break

        # logs are set CURRENT_TIME$BEHAVIOR$USER$CLIENT_IP
        log = line.split("$")

        # remove newline character
        log[-1] = log[-1][:-1]
        log_titles = ["date", "behavior", "who", "ip"]
        dict_log = {}

        for idx in range(len(log)):
            dict_log[log_titles[idx]] = log[idx]

        logs.append(dict_log)

    f.close()
    lock.release()

    return jsonify(logs)

#######################################################################
########################## EDIT DATA SECTION ##########################
#######################################################################


# Edit portfolio
@app.route("/api/edit/portfolio", methods=['POST'])
def edit_portfoilo():
    num = request.form.get("num")
    title = request.form.get("title")
    body = request.form.get("body")
    login_id = request.form.get("loginId")

    db = conn.db()
    cursor = db.cursor()
    sql = "update portfolios set title = %s, body = %s where num = %s"
    cursor.execute(sql, (title, body, num))
    db.commit()

    add_log("Edit portfolio", login_id)

    return ""


# Edit post
@app.route("/api/edit/post", methods=["POST"])
def edit_post():
    num = request.form.get("num")
    title = request.form.get("title")
    body = request.form.get("body")
    login_id = request.form.get("loginId")

    db = conn.db()
    cursor = db.cursor()
    sql = "update posts set title = %s, body = %s where num = %s"
    cursor.execute(sql, (title, body, num))
    db.commit()

    add_log("Edit post", login_id)

    return ""


# Edit user
@app.route("/api/edit/user", methods=["POST"])
def edit_user():
    umail = request.form.get("umail")
    uauth = request.form.get("uauth")

    db = conn.db()
    cursor = db.cursor()
    sql = "update users set uauth = %s where umail = %s"
    cursor.execute(sql, (uauth, umail))
    db.commit()

    return ""


#######################################################################
######################### DELETE DATA SECITON #########################
#######################################################################


# Delete portfolio
@app.route("/api/del/portfolio", methods=["POST"])
def delete_portfolio():
    num = request.form.get("num")
    login_id = request.form.get("loginId")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from portfolios where num = %s"
    cursor.execute(sql, (num))
    db.commit()

    add_log("Delete portfolio", login_id)

    return ""


# Delete post
@app.route("/api/del/post", methods=["POST"])
def delete_post():
    num = request.form.get("num")
    login_id = request.form.get("loginId")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from posts where num = %s"
    cursor.execute(sql, (num))
    db.commit()

    add_log("Delete post", login_id)

    return ""


# Delete user
@app.route("/api/del/user", methods=["POST"])
def delte_user():
    umail = request.form.get("umail")

    db = conn.db()
    cursor = db.cursor()
    sql = "delete from users where umail = %s"
    cursor.execute(sql, (umail))
    db.commit()

    return ""


#######################################################################
######################### INSERT DATA SECITON #########################
#######################################################################


# Insert devicetoken
@app.route("/api/add/devicetoken", methods=["POST"])
def add_devicetoken():
    devicetoken = request.form.get("devicetoken")
    umail = request.form.get("umail")
    uauth = request.form.get("uauth")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into devicetokens (num, umail, devicetoken, uauth) values(0, %s, %s, %s)"
    cursor.execute(sql, (umail, devicetoken,uauth))
    db.commit()

    return ""


# Insert portfolios
@app.route("/api/add/portfolio", methods=["POST"])
def add_portfolio():
    author = request.form.get("author")
    title = request.form.get("title")
    body = request.form.get("body")
    img = request.form.get("img")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into portfolios (num, author, title, body, img, created_at) values(0, %s, %s, %s, %s, timestamp(now()))"
    cursor.execute(sql, (author, title, body, img))
    db.commit()

    add_log("Add portfolio", author)

    return ""


# Insert post
@app.route("/api/add/post", methods=["POST"])
def add_post():
    author = request.form.get("author")
    title = request.form.get("title")
    body = request.form.get("body")

    db = conn.db()
    cursor = db.cursor()
    sql = "insert into posts (num, author, title, body, created_at) values(0, %s, %s, %s, timestamp(now()))"
    cursor.execute(sql, (author, title, body))
    db.commit()

    add_log("Add post", author)

    return ""


# Insert user
@app.route("/api/add/user", methods=["POST"])
def add_user():
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

    add_log("Add user", umail)

    return jsonify({"msg" : "가입완료!"})


if __name__ == "__main__":
  app.run(host="localhost", debug=True)
