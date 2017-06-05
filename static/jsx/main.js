var ScoreComponent = React.createClass({
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
        return (<div>
            <div className="row">
                {confirmed.length > 0?(
                    <div>
                        <div className="col-md-12 status_row_class row centered">
                            <h1>Выполненные заявки</h1>
                        </div>
                        <form role="form" className="panel panel-default orders-scroll">
                            <div className="form-group centered">
                                {confirmed.map(function (order) {
                                    var wait_status = order.wait_status;
                                    var customer_status = order.status.indexOf('CANCEL') !== -1? 'color-red': null;
                                    return <div className="col-md-3" title={order.price}>
                                        <div className={wait_status}>
                                            <div className="row">{order.created}</div>
                                            <div className="row">{order.confirmed}</div>
                                        </div>
                                        <div className={customer_status + ' row'}>{order.status}</div>
                                    </div>
                                })}
                            </div>
                        </form>

                    </div>): null}

                {waiting.length > 0?(
                    <div>
                        <div className="col-md-12 status_row_class row centered">
                            <h1>Заявки в ожидании</h1>
                        </div>
                        <form role="form" className="panel panel-default orders-scroll">
                            <div className="form-group  centered">
                                {waiting.map(function (order) {
                                    var wait_status = order.wait_status;
                                    var customer_status = order.status.indexOf('CANCEL') !== -1? 'color-red': null;
                                    return <div className="col-md-3" title={order.price}>
                                        <div className={wait_status}>
                                            <div className="row">{order.created}</div>
                                        </div>
                                        <div className={customer_status + ' row'}>{order.status}</div>
                                    </div>
                                })}
                            </div>
                        </form>
                    </div>): null}
            </div>
        </div>)
    }
});

ReactDOM.render(
    <ScoreComponent/>,
    document.getElementById('score_component')
);
