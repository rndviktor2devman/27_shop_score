(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ScoreComponent = React.CreateClass({
    getInitialState: function () {
        return {
            wait_time: null,
            unfinished_orders: null,
            finished_orders: null
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
              var wait = data.wait_time;
              var finished = data.finished_orders;
              var unfinished = data.unfinished_orders;
              this.setState({wait_time: wait, finished_orders: finished, unfinished_orders: unfinished});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    render: function () {
        return (React.createElement("div", null, 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-12 status_row_class row"}, 
                    React.createElement("h1", null, "Время ожидания заявок ", this.state.wait_time)
                ), 
                React.createElement("div", {className: "col-md-12 status_row_class row"}, 
                    React.createElement("h1", null, "Время ожидания заявок ", this.state.finished_orders)
                ), 
                React.createElement("div", {className: "col-md-12 status_row_class row"}, 
                    React.createElement("h1", null, "Время ожидания заявок ", this.state.unfinished_orders)
                )
            )
        ))
    }
});

ReactDOM.render(
    React.createElement(ScoreComponent, null),
    document.getElementById('score_component')
);

},{}]},{},[1]);
