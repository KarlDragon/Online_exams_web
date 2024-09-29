import mysql.connector
from mysql.connector import errorcode

def get_db_connection():
    try:
        cnx = mysql.connector.connect(user='KarlDragon', password='12345678',
                                    host='127.0.0.1',
                                    database='web_database')
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return None

def authenticate_user(username, password):
    cnx = get_db_connection()
    if not cnx:
        return None
    
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    
    cursor.close()
    cnx.close()
    
    return user

def register_user(email, username, password, mode):
    cnx = get_db_connection()
    if not cnx:
        print("Database connection failed")
        return False
    
    cursor = cnx.cursor()
    query = "INSERT INTO users (email, username, password, mode) VALUES (%s, %s, %s, %s)"
    try:
        cursor.execute(query, (email, username, password, mode ))
        cnx.commit()
        success = True
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        success = False
    
    cursor.close()
    cnx.close()
    
    return success