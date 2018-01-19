from flask import Flask, render_template, request, jsonify, \
    send_from_directory
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from os import getenv


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.reflect()


class Orders(db.Model):
    __table__ = db.Model.metadata.tables['orders']


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


@app.route('/')
def score():
    confirmed_orders = Orders.query.filter(
        Orders.confirmed.isnot(None)).order_by(Orders.status)
    today_date = datetime.now()
    today_confirmed = [order for order in confirmed_orders
                       if order.confirmed.day == today_date.day
                       and order.confirmed.month == today_date.month]
    unconfirmed_orders = Orders.query.filter(
        Orders.confirmed.is_(None)).order_by(Orders.status).count()

    wait_time = get_waiting_time()
    return render_template('score.html',
                           processed_day=len(today_confirmed),
                           waiting_time=wait_time,
                           unconfirmed=unconfirmed_orders)


if __name__ == "__main__":
    app.run()
