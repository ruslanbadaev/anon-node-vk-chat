const needle = require('needle');
const mongoClient = require("mongodb").MongoClient;
const { Bot } = require('node-vk-bot');
const VK = require('vk-bot-sdk');
const groupToken = ('Токен_Группы');
const adminToken = ('Токен_Админа');
const groupId = ('168918774');
const Group = new VK.Group(groupToken);
const bot = new Bot({

token: groupToken
}).start()

bot.get(/#Ник|#Нiк|#Nick/i, message => {

const str = message.body,
	 n = str.lastIndexOf(':'),
	 result = str.substring(n + 1);

console.log(result);

const options = {user_id:message.user_id}
bot.send('Теперь Ваш ник - ' + result, message.peer_id, options)

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, function(err, client){
      
    const db = client.db("usersdb");
    const collection = db.collection("nick_test");

    let user = { id: message.user_id, nick: result, admin: false };
    collection.remove({id : message.user_id})
    collection.insertOne(user, function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});
});

bot.get(/#Ban|#забан|#Бан/i, message => {

const str = message.body,
	n = str.lastIndexOf(':'),
	resultets = str.substring(n + 1);

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, function(err, client){
      
    const db = client.db("usersdb");
    const collection = db.collection("nick_test");
 
if(err) return console.log(err);
	collection.find({nick: resultets}).toArray(function(err, results){

const url = encodeURI("https://api.vk.com/api.php?oauth=1&method=groups.ban&group_id="+groupId+"&user_id="+ results[0].id +"&v=5.67&access_token=" + adminToken);
needle.get(url, function(err, resp){
if (!err && resp.statusCode == 200)
    console.log('user is banned');
});  

const url = encodeURI("https://api.vk.com/api.php?oauth=1&method=groups.getMembers&group_id="+groupId+"&count=1000&v=5.67&access_token=" + groupToken);
needle.get(url, function(err, resp){
    if (!err && resp.statusCode == 200)
const re = (resp.body['response']),
	items = (re.items),
	items_cover = (''+items+''),
	user_id_who_send_message = message.user_id,
	arr = items,
	index = arr.indexOf(user_id_who_send_message);
if (index >= 0) {
  arr.splice( index, 1 );
}

const ready_array = (''+arr+'');
Group.sendToIds([items_cover], resultets + ' исключен из беседы.')
client.close();

}); 
});  
});
});


bot.get(/#Info|#iнфо|#Инфо/i, message => {
const options =  {}
bot.send('Добро пожаловать в анонимную бесседу. \n Чтобы выбрать ник, пиши \n \n #nick: ТвойНик \n \n Здесь царит атмосфера свободы и анонимности. \n По всем вопросам и предложениям обращаться к [id300397513|Сенсею Создателю.] \n \n Он с радостью ответит. ', message.peer_id, options)
});


bot.get(/join|group|club/i, message => {
const options =  {}
bot.send('Ваше сообщение перехвачено ботом администратором и не будет доставленно адресатам.', message.peer_id, options)
});


bot.get(/||/i, message => {


Group.isMember(message.user_id, (isSubscriber) => {
  if (isSubscriber) {
     console.log('Подписан');
  
    if( message.body == ''){
        const options =  {}
        bot.send('Вы не можете отправлять сюда медиафайлы и стикеры. Для отправки фото или записи - пришлите ссылку на нее.', message.peer_id, options)
    } else {

var url = encodeURI("https://api.vk.com/api.php?oauth=1&method=groups.getMembers&group_id="+groupId+"&count=1000&v=5.67&access_token=" + groupToken);
needle.get(url, function(err, resp){
    if (!err && resp.statusCode == 200)
const re = (resp.body['response']),
	items = (re.items),
	items_cover = (''+items+''),
	user_id_who_send_message = message.user_id,
	arr = items,
	index = arr.indexOf(user_id_who_send_message);
    if (index >= 0) {
        arr.splice( index, 1 );
    }

const ready_array = (''+arr+'');

const url = "mongodb://localhost:27017/";
mongoClient.connect(url, function(err, client){
      
    const db = client.db("usersdb");
    const collection = db.collection("nick_test");
 
    if(err) return console.log(err);

const nick = ('Anon');
let dbfind = collection.find({id: message.user_id}).toArray(function(err, results){

    if(results != ''){
        var nick = (results[0].nick);
     }

Group.sendToIds([ready_array],'[club'+groupId+'|' + nick + ']: ' + message.body)

});
});
});  
}
} else {
const options =  {}
bot.send('Отлично, ты в беседе. \n 🐨🐨🐨🐨🐨🐨🐨🐨🐨🐨🐨 \n Теперь для получения сообщений других участников - подпишись и поприветствуй беседу. \n \n  Общение будет происходить в этой группе. \n \n Бот анонимизирует сообщения и другие участники не увидят данных о тебе (кроме ника). \n\n Для получения ника, после подписки введи \n \n #nick: ТвойНик \n \n Приятного общения!', message.peer_id, options)
  }
})
});
