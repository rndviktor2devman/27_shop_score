from flask import render_template, request, jsonify, send_from_directory
from datetime import datetime, timedelta, date
from sqlalchemy import and_
from orders import Orders, app


def get_older_order_waiting_time():
    older_order = Orders.query.filter(
        Orders.created > date.today(),
        and_(Orders.confirmed.is_(None))).order_by(Orders.created).first()
    if older_order is None:
        return 0
    else:
        wait_time = datetime.now() - older_order.created
        return wait_time - timedelta(microseconds=wait_time.microseconds)


@app.route('/robots.txt')
def robots_file():
    return send_from_directory('', request.path[1:])


@app.route('/check_state')
def check_state():
    today_confirmed = Orders.query.filter(
        Orders.confirmed.isnot(None),
        and_(Orders.confirmed > date.today())).order_by(Orders.status).all()

    unconfirmed_orders = Orders.query.filter(
        Orders.confirmed.is_(None)).order_by(Orders.status).count()

    wait_time = get_older_order_waiting_time()
    return jsonify(processed_day=len(today_confirmed),
                   waiting_time=wait_time,
                   unconfirmed=unconfirmed_orders)


@app.route('/')
def default():
    return render_template('score.html')


if __name__ == "__main__":
    app.run()
