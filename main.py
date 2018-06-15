from flask import Flask, render_template, request
import json
import datetime
import os
app = Flask(__name__)

@app.route('/')
def show_survey():
    """Show the main survey page"""
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    """
    Write out data to a JSON file in a subdirectory based on the PI name.
    """
    datadir = 'data'
    if not os.path.exists(datadir):
        os.makedirs(datadir)

    lastname = request.form.get('pi_lastname')
    firstname = request.form.get('pi_firstname')

    pi_path = os.path.join(datadir, lastname + '_' + firstname)

    if not os.path.exists(pi_path):
        os.makedirs(pi_path)

    filename = datetime.datetime.now().isoformat()
    filename_suffix = '.json'

    path = os.path.join(pi_path, filename + filename_suffix)

    with open(path, 'a') as outfile:
        json.dump(request.form, outfile)

    return('hello')

if __name__ == '__main__':
    app.run(host = '0.0.0.0')
