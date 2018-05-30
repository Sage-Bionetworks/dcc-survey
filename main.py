from flask import Flask, render_template, request
import json
import datetime
import os
app = Flask(__name__)

@app.route('/')
def show_survey():
  return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
  directory = 'data'
  if not os.path.exists(directory):
    os.makedirs(directory)

  filename = datetime.datetime.now().isoformat()
  filename_suffix = '.json'

  path = os.path.join(directory, filename + filename_suffix)

  with open(path, 'a') as outfile:
    json.dump(request.form, outfile)

  return('hello')

if __name__ == '__main__':
  app.run(debug = True)
