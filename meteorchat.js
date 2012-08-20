
Messagelog = new Meteor.Collection("messagelog");

if (Meteor.is_client) {
    // メッセージ履歴の取得
    Template.messages.messagelog = function () {
        var msglog =  Messagelog.find(
        {},
        {
            sort: {
                time_count: -1
            }

        }
        ).fetch();
        
        // 上位15件を返却
        return msglog.slice(0, 15);
    };
    
    // submit ボタン押下時の処理
    Template.post_form.events = {
        'click input#submit': function () {
            FB.api('/me&locale=ja_JP', function(response) {
                message_text = $("input#message_text").val();
                name = response.name;
                id = response.id;
                
                nowDate    = new Date();
                var year   = nowDate.getFullYear();
                var month  = nowDate.getMonth() + 1; 
                var date   = nowDate.getDate(); 
                var hour   = nowDate.getHours(); 
                var min    = nowDate.getMinutes(); 
                var sec    = nowDate.getSeconds(); 
                
                var post_date = year + "/" + month + "/" + date + " "
                + hour + ":" + min + ":" + sec;
                
                Messagelog.insert({
                    id: id,
                    name: name,
                    message: message_text,
                    time_count: nowDate.getTime(),
                    post_date: post_date
                    
                });
            });
            
        }
    };
}


if (Meteor.is_server) {
    Meteor.startup(function () {
        // チャットログを全消去
        //Messagelog.remove({});
    });
}
