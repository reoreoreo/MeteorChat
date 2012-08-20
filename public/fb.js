$(function(){
    var APP_ID = '431711670200752';
    FB.init({
        appId: APP_ID,
        status: true,
        cookie: true,
        xfbml: true,
        oauth: true
    });

    FB.getLoginStatus(function(response) {
        if (response.session) {
        }else{
            FB.login(function(response) {
                FB.api('/me&locale=ja_JP', function(response) {
                    var img_url = "https://graph.facebook.com/"+ response.id +"/picture";
                    $('#msg_frm').append("<img src='" + img_url + "'>");
                });
            },{});
        }
    });

    $('#messagelog').live('DOMNodeInserted', function(event) {
        $('#messagelog').listview('refresh');
        $('input#message_text').val('');
        $('input#message_text').focus();
    });
});