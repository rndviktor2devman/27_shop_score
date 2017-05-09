import os
basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = os.environ.get('SERVER_DEBUG_MODE')
DEVELOPMENT = os.environ.get('SERVER_DEVELOPMENT_MODE')
TESTING = False
CSRF_ENABLED = True
SECRET_KEY = 'top  secret!'
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')