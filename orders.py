from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, DateTime, Enum
from os import getenv


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Orders(db.Model):
    __tablename__ = 'orders'

    id = db.Column(String, primary_key=True)
    created = db.Column(DateTime, nullable=False, index=True)
    confirmed = db.Column(DateTime, index=True)
    status = db.Column(Enum('DRAFT', 'FULFILLMENT', 'CANCELED', 'COMPLETED',
                            name='statuses'), nullable=False, index=True)
