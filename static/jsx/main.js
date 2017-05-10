var ScoreComponent = React.CreateClass({
    getInitialState: function () {
        return {

        };
    },

    render: function () {
        return (<div>
            <div className="row">
                <div className="col-md-12">

                </div>
            </div>
        </div>)
    }
});

ReactDOM.render(
    <ScoreComponent/>,
    document.getElementById('score_component')
);
