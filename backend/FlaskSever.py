from flask import Flask, request, jsonify
from flask_cors import CORS
from database import authenticate_user, register_user

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    # Perform authentication logic here
    user = authenticate_user(username, password)
    if user:
        return jsonify({'message': 'Login successfully!', 'username': username, 'password': password})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    mode = data.get('mode')
    # Perform registration logic here
    success = register_user(email, username, password, mode)
    if success:
        return jsonify({'message': 'Register successfully', 'email': email, 'username': username, 'password': password, 'mode': mode})
    else:
        return jsonify({'message': 'Registration failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)