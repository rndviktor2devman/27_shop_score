import os
basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = os.environ.get('SERVER_DEBUG_MODE')
DEVELOPMENT = os.environ.get('SERVER_DEVELOPMENT_MODE')
TESTING = False
CSRF_ENABLED = True
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
