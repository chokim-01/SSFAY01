import pymysql

def db():
    return pymysql.connect(host='localhost', port=3306, user='root', passwd='toor', db='webmobile', charset='utf8')

def cursor():
    return db.cursor()
