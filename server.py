from flask import Flask, render_template, request, jsonify, \
    send_from_directory
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Text, DateTime, Enum
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


def get_waiting_time():
    order = Orders.query.filter(
        Orders.confirmed.is_(None)).first()
    if order is None:
        return 0
    else:
        wait_time = datetime.now() - order.created
        return wait_time - timedelta(microseconds=wait_time.microseconds)


@app.route('/robots.txt')
def robots_file():
    return send_from_directory('', request.path[1:])


@app.route('/check_state')
def check_state():
    confirmed_orders = Orders.query.filter(
        Orders.confirmed.isnot(None)).order_by(Orders.status)
    today_date = datetime.now()
    today_confirmed = [order for order in confirmed_orders
                       if order.confirmed.day == today_date.day
                       and order.confirmed.month == today_date.month]
    unconfirmed_orders = Orders.query.filter(
        Orders.confirmed.is_(None)).order_by(Orders.status).count()

    wait_time = get_waiting_time()
    return jsonify(processed_day=len(today_confirmed),
                   waiting_time=wait_time,
                   unconfirmed=unconfirmed_orders)


@app.route('/')
def default():
    return render_template('score.html')


if __name__ == "__main__":
    app.run()
