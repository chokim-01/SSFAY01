from flask import Flask
from flask import jsonify
import conn.conn as conn
import sys
import os

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

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file('index.html')

@app.route('/api/admin')
def admin_page():
  db = conn.db()
  cursor = db.cursor()
  cursor.execute('select * from posts')
  res = cursor.fetchall()
  return jsonify(res)

if __name__ == '__main__':
  app.run(host='localhost', debug=True)
