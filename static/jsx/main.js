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
        return (<div>
            <div className="row">
                <div className="col-md-12 status_row_class row">
                    <h1>Время ожидания заявок {this.state.wait_time}</h1>
                </div>
                <div className="col-md-12 status_row_class row">
                    <h1>Время ожидания заявок {this.state.finished_orders}</h1>
                </div>
                <div className="col-md-12 status_row_class row">
                    <h1>Время ожидания заявок {this.state.unfinished_orders}</h1>
                </div>
            </div>
        </div>)
    }
});

ReactDOM.render(
    <ScoreComponent/>,
    document.getElementById('score_component')
);
