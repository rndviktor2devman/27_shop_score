# Shop Score Page

This project represents example of simple dashboard, for example web-store dashboard.
After start the board checks the state of the remote database and shows KPI,
in our particular case they are 'Count of orders', 'Count of orders in a waiting list', 'The longest wait time'.

Example of working page is available [here](http://hidden-basin-76325.herokuapp.com/)

# Setup

Before setup your system should have libpq-dev and python-dev installed:
```
sudo apt install libpq-dev python3-dev
```
Then you have to satisfy all requirements:
```
pip3 install -r requirements.txt
```

# Run
```
python3 server.py
```

The site will be available [here](http://localhost:5000/)

# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
