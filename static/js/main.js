function checkState(){
     $.ajax({
        url: '/check_state',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            updateUI(response);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

var cleanClass = function(element){
    if(element.hasClass('text-success')){
        element.removeClass('text-success');
    }
    if(element.hasClass('text-warning')){
        element.removeClass('text-warning');
    }
    if(element.hasClass('text-error')){
        element.removeClass('text-error');
    }
}

var updateUI = function(data){
    var wait_minutes = data['waiting_time']/60;
    var unconfirmed = data['unconfirmed'];
    var element = $("#main_message");
    cleanClass(element);
    if(wait_minutes < 7){
        element.addClass('text-success');
    } else if(wait_minutes => 7 && wait_minutes < 30) {
        element.addClass('text-warning');
    } else {
        element.addClass('text-error');
    }

    var unconfirmedEl = $("#unconfirmed");
    cleanClass(unconfirmedEl);
    if(unconfirmed < 3){
        unconfirmedEl.addClass('text-success');
    } else if(unconfirmed >= 3 && unconfirmed < 10){
        unconfirmedEl.addClass('text-warning');
    } else {
        unconfirmedEl.addClass('text-error');
    }

    $("#wait_time").text(wait_minutes);
    $("#confirmed").text(data['processed_day']);
    unconfirmedEl.text(unconfirmed);
}

$(document).ready(function(){
    checkState();
    setInterval(checkState, 1000);
    }
);