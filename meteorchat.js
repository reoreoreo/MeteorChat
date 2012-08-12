
// MongoDB コレクションオブジェクト定義
Messagelog = new Meteor.Collection("messagelog");

if (Meteor.is_client) {
    Template.messages.messagelog = function () {
        var msglog =  Messagelog.find(
        {},
        {
            sort: {
                time_count: -1
            }

        }
        ).fetch();
        return msglog.slice(0, 15);
    };
    
    Template.post_form.events = {
        'click input#submit': function () {
            FB.api('/me&locale=ja_JP', function(response) {
                message_text = $("input#message_text").val();
                name = response.name;
                id = response.id;
                
                nowDate    = new Date();
                var year   = nowDate.getFullYear(); // 年 
                var month  = nowDate.getMonth() + 1; // 月 
                var date   = nowDate.getDate(); // 日 
                var hour   = nowDate.getHours(); // 時 
                var min    = nowDate.getMinutes(); // 分 
                var sec    = nowDate.getSeconds(); // 秒 
                
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

// On server startup, create some players if the database is empty.
if (Meteor.is_server) {
    Meteor.startup(function () {
        // チャットログを全消去
        Messagelog.remove({});        
    });
}
