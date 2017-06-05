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


@app.route('/get_status')
def sratus():
    today_orders = Orders.query.filter(cast(Orders.created, Date) == datetime.now().date())
    orders_confirmed = []
    orders_waiting = []
    for order in today_orders.all():
        if order.confirmed is None:
            wait_time = (datetime.now() - order.created).total_seconds() / 60
            confirmed = None
        else:
            wait_time = (order.confirmed - order.created).total_seconds() / 60
            confirmed = order.confirmed.strftime("%H:%M:%S")
        if wait_time < 7:
            wait_status = 'color-green'
        elif wait_time < 30:
            wait_status = 'color-yellow'
        else:
            wait_status = 'color-red'
        order_data = {
            'price': str(order.price),
            'status': order.status,
            'created': order.created.strftime("%H:%M:%S"),
            'confirmed': confirmed,
            'wait_status': wait_status
        }
        if order_data['confirmed'] is not None:
            orders_confirmed.append(order_data)
        else:
            orders_waiting.append(order_data)

    orders_confirmed.sort(key=lambda x: x['created'])
    orders_waiting.sort(key=lambda x: x['created'])

    response_data = {
        'orders_confirmed': orders_confirmed,
        'orders_waiting': orders_waiting
    }
    return jsonify(response_data)


@app.route('/')
def score():
    return render_template('score.html')

if __name__ == "__main__":
    app.run()
