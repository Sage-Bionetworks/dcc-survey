from flask import Flask, render_template, request
import json
app = Flask(__name__)

@app.route('/')
def show_survey():
  return render_template("index.html")

@app.route('/submit', methods=['POST'])
def submit():
  print(json.dumps(request.form))
  return("hello")

if __name__ == '__main__':
  app.run(debug = True)
