from flask import Flask, render_template, jsonify
from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func


app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
db.reflect()


class Orders(db.Model):
    __table__ = db.Model.metadata.tables['orders']


@app.route('/get_status')
def sratus():
    unfinished_order = Orders.query.order_by(Orders.created).filter(Orders.confirmed.is_(None)).first()
    wait_seconds = round((datetime.now() - unfinished_order.created).total_seconds())
    unfinished_amount = Orders.query.filter(Orders.confirmed.is_(None)).count()
    finished_amount = Orders.query.filter(Orders.confirmed.is_(not None)).count()
    return jsonify({'wait_time': wait_seconds, 'finished': finished_amount, 'unfinished': unfinished_amount})



@app.route('/')
def score():
    # unfinished_order = Orders.query.order_by(Orders.created).filter(Orders.confirmed.is_(None)).first()
    # wait_seconds = round((datetime.now() - unfinished_order.created).total_seconds())
    # unfinished_amount = Orders.query.filter(Orders.confirmed.is_(None)).count()
    
    return render_template('score.html')

if __name__ == "__main__":
    app.run()
