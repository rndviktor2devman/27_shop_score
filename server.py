from flask import Flask, render_template, jsonify
from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import cast, Date


app = Flask(__name__)
app.config.from_object('config')
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
        return datetime.now().hour*60 + datetime.now().minute -\
               order.created.hour+order.created.minute


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
