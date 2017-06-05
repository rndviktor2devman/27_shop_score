(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ScoreComponent = React.createClass({displayName: "ScoreComponent",
    getInitialState: function () {
        return {
            orders_confirmed: [],
            orders_waiting: []
        };
    },

    componentDidMount: function () {
        this.pingServer();
        setInterval(this.pingServer, 10000);
    },

    pingServer: function () {
        $.ajax({
          url: '/get_status',
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({orders_confirmed: data.orders_confirmed, orders_waiting: data.orders_waiting});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    render: function () {
        var confirmed = this.state.orders_confirmed;
        var waiting = this.state.orders_waiting;
        return (React.createElement("div", null, 
            React.createElement("div", {className: "row"}, 
                confirmed.length > 0?(
                    React.createElement("div", null, 
                        React.createElement("div", {className: "col-md-12 status_row_class row centered"}, 
                            React.createElement("h1", null, "Выполненные заявки")
                        ), 
                        React.createElement("form", {role: "form", className: "panel panel-default orders-scroll"}, 
                            React.createElement("div", {className: "form-group centered"}, 
                                confirmed.map(function (order) {
                                    var wait_status = order.wait_status;
                                    var customer_status = order.status.indexOf('CANCEL') !== -1? 'color-red': null;
                                    return React.createElement("div", {className: "col-md-3", title: order.price}, 
                                        React.createElement("div", {className: wait_status}, 
                                            React.createElement("div", {className: "row"}, order.created), 
                                            React.createElement("div", {className: "row"}, order.confirmed)
                                        ), 
                                        React.createElement("div", {className: customer_status + ' row'}, order.status)
                                    )
                                })
                            )
                        )

                    )): null, 

                waiting.length > 0?(
                    React.createElement("div", null, 
                        React.createElement("div", {className: "col-md-12 status_row_class row centered"}, 
                            React.createElement("h1", null, "Заявки в ожидании")
                        ), 
                        React.createElement("form", {role: "form", className: "panel panel-default orders-scroll"}, 
                            React.createElement("div", {className: "form-group  centered"}, 
                                waiting.map(function (order) {
                                    var wait_status = order.wait_status;
                                    var customer_status = order.status.indexOf('CANCEL') !== -1? 'color-red': null;
                                    return React.createElement("div", {className: "col-md-3", title: order.price}, 
                                        React.createElement("div", {className: wait_status}, 
                                            React.createElement("div", {className: "row"}, order.created)
                                        ), 
                                        React.createElement("div", {className: customer_status + ' row'}, order.status)
                                    )
                                })
                            )
                        )
                    )): null
            )
        ))
    }
});

ReactDOM.render(
    React.createElement(ScoreComponent, null),
    document.getElementById('score_component')
);

},{}]},{},[1]);
