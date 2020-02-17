from flask import Flask
app = Flask(__name__)

@app.route('/sample') # browse function

def running():
    return 'Flask is running!'