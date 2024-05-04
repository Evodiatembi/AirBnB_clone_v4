!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
app = Flask(__name__)
# app.jinja_env.trim_blocks = True              # app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
@app.route('/1-hbnb/')  # Replace /0-hbnb/ with /1-hbnb/
def index():
    # Your logic to handle the route goes here
    return "Welcome to 1-hbnb!"

    storage.close()
