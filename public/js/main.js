$(document).ready(function () {

    "use strict";

    let shop_id = !!$.urlParam('shopid') ? $.urlParam('shopid') : '';
    let sub_id = !!$.urlParam('sub_id') ? $.urlParam('sub_id') : '';
//     const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Preloader
    $(window).load(function () { // makes sure the whole site is loaded
        $('.page-preloader spinner').fadeOut(); // will first fade out the loading animation
        $('.page-preloader').delay(350).fadeOut('slow');
        // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
        const pos = $('#btnRegister').position();
        $("#btnBrowse").parent().css({position: 'relative'});
        $("#btnBrowse").css({top: (pos.top -270 ), left: 100, position:'absolute'});
    })

    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    if(!!shop_id && !!sub_id){
        $.ajax({
            url: app.serverAPI + '/shop/details/'+shop_id,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
                if(response.status === 'success'){
                    let eventName = (response.msg.name.toUpperCase()).replace(/AND/g, '&');
                    $('#popupShopName').html(eventName);
                    $('#popupShopName1').html(eventName);
                    $(document).prop('title', eventName);
                    $.setParam('title', eventName);
                    $('#desciption').html(response.msg.description);
                    const startDate = new Date(response.msg.startDate);
                    const endDate = new Date(response.msg.endDate);
                    moment.locale('fr');
                    const startDay = moment(startDate).format("dddd, Do MMM");
                    const endDay = moment(endDate).format("dddd, Do MMM");
                    const startYear = moment(startDate).format("YYYY");
                    const endYear = moment(startDate).format("YYYY");
                    let displayDate = "";
                    if(startYear === endYear){
                        displayDate = startDay +' - ' + endDay + ' ' + endYear;
                    } else {
                        displayDate = startDay + ' ' + startYear +' - ' + endDay + ' ' + endYear;
                     }
                     $.setParam('eventDate',moment(startDate).format("Do") +" - " + moment(endDate).format("Do") +' '+ moment(endDate).format("MMM") + ' ' +moment(endDate).format("YYYY"));
                    // Animated typing text
                    $(".animated-text").typed({
                        strings: [
                            displayDate
                        ],
                        typeSpeed: 20,
                        startDelay: 1000,
                        loop: true,
                        loopCount: 2,
                    });

                    $('#btnBrowse').attr('href', '/browseproducts?sub_id='+sub_id+'&shopid='+shop_id);
                    $('#btnBrowse').attr('target', '_blank');
                    const address = response.msg.address.address1 + ',' + response.msg.address.city +',' + response.msg.address.zip + ',' + response.msg.address.country;
                    $.setParam('eventAddress1', response.msg.address.address1);
                    $.setParam('eventAddress2', response.msg.address.city + ' '+ response.msg.address.zip);
                    $('#address').html(address);
                    if(!!response.msg.mobile){
                        $('#shopMobile').html(response.msg.mobile);
                    } else {
                        $('#shopMobile').html('-')
                    }

                    if(!!response.msg.email){
                        $('#shopEmail').html(response.msg.email);
                    } else {
                        $('#shopEmail').html('-')
                    }

                    if(!!response.msg.banner){
                        $('#home').css('background-image', 'url('+response.msg.banner.lg+')');
                    } else {
                        $('#home').css('background-image','url(img/banner.jpg)');
                    }

                    if(!!response.msg.picture){
                        $('#eventTextImg').attr('src', response.msg.picture.sm);
                        $.setParam('eventImage',response.msg.picture.sm);
                    } else {
                        $('#eventTextImg').attr('src',app.DEFAULT_EVENT);
                        $.setParam('eventImage','');
                    }
                    getEventDetails(response.msg.event_id);
                }
            }, error: function(xhr, status, error) {
                alert(xhr.responseJSON.msg);
            }
        });
    }

    $('#btnRegister').click(function(){
        let gdpr,accept_mail;

        if($('#new_user_firstname').val() === ''){
            $('#new_user_firstname').focus();
            alertMsgText('Prénom obligatoire', 'alert-warning');
            return false;
        }

        if($('#new_user_lastname').val() === ''){
            $('#new_user_lastname').focus();
            alertMsgText('Nom obligatoire', 'alert-warning');
            return false;
        }

        if($('#new_user_email').val() === ''){
            $('#new_user_email').focus();
            alertMsgText('Email obligatoire', 'alert-warning');
            return false;
        }

        if($('#new_user_password').val() === ''){
            $('#new_user_password').focus();
            alertMsgText('Mot de passe obligatoire', 'alert-warning');
            return false;
        }
        if($('#new_user_password_confirm').val() === ''){
            $('#new_user_password_confirm').focus();
            alertMsgText('Confirmez le mot de passe obligatoire', 'alert-warning');
            return false;
        }

        if($('#new_user_password').val() !== $('#new_user_password_confirm').val()) {
            $('#new_user_password').focus();
            alertMsgText('Mot de passe et confirmer le mot de passe doit être identique', 'alert-warning');
            return false;
        }

        if($("input[type='checkbox'][id='new_user_Checkbox1']:checked").length == 1) {
            gdpr = 'TRUE';
        } else {
            gdpr = 'FALSE';
        }

        if (gdpr === 'FALSE') {
            alertMsgText('Pour vous enregistrer, merci de cocher la case  "accepter la politique de confidentialité"', 'alert-warning');
            return false;
        }

        if($("input[type='checkbox'][id='new_user_Checkbox2']:checked").length == 1) {
            accept_mail = 'TRUE';
        } else {
            accept_mail = 'FALSE';
        }

        $('#alertMsgText').css('display','hide');
        $("#btnRegister").attr("disabled", "disabled");
        $('#btnLoading').css('display','inline-block');
    const userObject ={
            First_Name: $('#new_user_firstname').val(),
            Last_Name: $('#new_user_lastname').val(),
            Full_Name: $('#new_user_firstname').val() +' '+ $('#new_user_lastname').val(),
            Email: $('#new_user_email').val().toLowerCase(),
            gdpr: gdpr,
            isAgree: accept_mail,
            type: 'CUSTOMER',
            firstname: $('#new_user_firstname').val(),
            lastname: $('#new_user_lastname').val(),
            email: $('#new_user_email').val().toLowerCase(),
            password: $('#new_user_password').val(),
            isSocial: 'FALSE',
            contactSource: 'FERMYNT',
            sub_id: sub_id,
            shop_id: shop_id
        };

        $.ajax({
        url: app.serverAPI + '/customer/checkCustomer',
        data: JSON.stringify({email: userObject.email}),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
            success: function(response){
                if(response.status === app.success){
                    alertMsg('Le client existe déjà');
                } else {
                    alertMsg(response.msg);
                }
                $("#btnRegister").removeAttr("disabled");
                $('#btnLoading').css('display','none');
            }, error: function(xhr, status, error) {
                if(xhr.responseJSON.msg ===  'No Customer Found' ) {
                    // alert('here');
                    $.ajax({
                    url: app.serverAPI + '/contacts',
                    data: JSON.stringify(userObject),
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                        success: function(response){
                            $("#btnRegister").removeAttr("disabled");
                            $('#btnLoading').css('display','none');
                            if(response.status === app.success){
                                alertMsg('enregistré avec succès' , 'Félicitations');
                                alertMsgText('enregistré avec succès','alert-success');
                                $('#new_user_firstname').val('');
                                $('#new_user_lastname').val('');
                                $('#new_user_email').val('');
                                $('#new_user_password').val('');
                                $('#new_user_password_confirm').val('');
                            } else {
                                alertMsg(response.msg);
                            }
                        }, error: function(xhr, status, error) {
                            $("#btnRegister").removeAttr("disabled");
                            $('#btnLoading').css('display','none');
                            alertMsg(xhr.responseJSON.msg);
                        }
                    });
                }else {
                    $("#btnRegister").removeAttr("disabled");
                    $('#btnLoading').css('display','none');
                    alertMsg(xhr.responseJSON.msg);
                }
            }
        });
    });

    function alertMsg(msg ,title) {
        $('#modalMsg').html(msg);
        if(!!title) {
            $('#modelTitle').html(title);
        } else {
            $('#modelTitle').html('Alerte');
        }
        document.getElementById('btnPopup').click();

        setTimeout(function(){
            document.getElementById('btnCloseModal').click();
        }, 3000);
    }

    function alertMsgText(msg, className) {
        $('#alertMsgText').css('display','block');
        $('#alertMsgText').html(msg);
        $('#alertMsgText').removeClass('alert-warning alert-success alert-info alert-danger').addClass(className);
    }

    function getEventDetails(eventId) {
        $.ajax({
            url: app.serverAPI + '/events/details/'+eventId,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
                if( response.status === 'success'){
                    init(response.msg.location.coordinates[1], response.msg.location.coordinates[0])
                } else {
                    init(48.86413152779803, 2.3417617185671133);
                }
            }, error: function(xhr, status, error) {
                init(48.86413152779803, 2.3417617185671133);

            //alert(xhr.responseJSON.msg);
            }
        });
    }

    // PopUp Effect

    // $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    //     disableOn: 700,
    //     type: 'iframe',
    //     mainClass: 'mfp-fade',
    //     removalDelay: 160,
    //     preloader: false,

    //     fixedContentPos: false
    // });

    // $.extend(true, $.magnificPopup.defaults, {
    //     iframe: {
    //         patterns: {
    //             youtube: {
    //                 index: 'youtube.com/',
    //                 id: 'v=',
    //                 src: 'http://www.youtube.com/embed/%id%?autoplay=1'
    //             }
    //         }
    //     }
    // });

    // Owl Clients
/*
    $("#owl-clients").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]

    });

    // Owl Testimonils

    $("#owl-testimonials").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 600,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "goDown",
        autoPlay: true
    });
*/
    // Snazzy Maps
// google.maps.event.addDomListener(window, 'load', init);

    function init(lat, lng) {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 15,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(lat, lng, 17.18), // Casablanca

            // Disables the default Google Maps UI components
            scrollwheel: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        var myLatLng = new google.maps.LatLng(lat, lng);
        // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: $('#address').html()
        });
    }
});