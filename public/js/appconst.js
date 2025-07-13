var app = {};
app.serverAPI = 'https://api.fermynt.com';
app.success = 'success';
app.DEFAULT_WINE_BOTTLE = 'https://storage.googleapis.com/fermynt-paris.appspot.com/shop-1551249501312.png';
app.DEFAULT_EVENT = 'img/Event1.png';
// Disable cache for the ajax call
$.ajaxSetup({ cache: false });

$.setParam = function (key, value) {
     Cookies.set(key, value, { expires: 0.1 });
};

$.getParam = function (key) {
    return Cookies.get(key);
}

$.removeParam = function (key) {
    Cookies.remove(key);
}

$.showPopupMsg = function(msg) {
    $('#snackbar').html(msg);
    $('#snackbar').addClass('show');
    setTimeout(function(){$('#snackbar').removeClass('show'); }, 3000);
}

$.Logout = function () {
    // Cookies.remove();
    $.removeParam('redirectURLLogin')
    window.location.href= '/?shopid='+$.getParam('shopid')+'&sub_id='+$.getParam('subid');
}


$.triggerNavAction = function (){
    // console.log('i am here', $('#navbarCollapse').hasClass('show'));
    if(!$('#navbarCollapse').hasClass('show')) {
        $('#btnGoToShoppingCart').css('display', 'none');
        $('#btnGoToShoppingCart1').css('display', 'block');
    } else {
        setTimeout(function(){
            $('#btnGoToShoppingCart').css('display', 'block');
         }, 300);
    }
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.href);
    if (results == null) {
         return 0;
    }
    return results[1] || 0;
}
