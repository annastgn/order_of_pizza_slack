
const SlackBot = require('slackbots');
const bot = new SlackBot({
  token: 'xoxb-735725039201-742121598149-9VbWN88J8qOX4whBTjclAK0m',
  name: 'PizzaBot'});

bot.on('start', function(){
    bot.postMessageToChannel('general','If you want to make the order, send - wantPizza');
});

bot.on('error', function(err){
    console.log(err);
});

const fs = require("fs");
var number=0;
function createOrder(data){
     number=number+1;
     fs.writeFileSync("Orders.txt", "Order №"+number+"\n"+"User: "+data.user); 
    
     bot.postMessageToChannel('general', 'Enter the name of your pizza'); 
     bot.on('message', function(name){
         
         if (name.text){
             
             fs.writeFileSync("Orders.txt","Pizza: "+name.text);
             bot.postMessageToChannel('general', 'Enter the size of your pizza');
             bot.on('message', function(size){
                 
                 if (size.text){
                     
                     fs.writeFileSync("Orders.txt","Size: "+size.text);
                     bot.postMessageToChannel('general', 'Enter the address'); 
                     bot.on('message', function(){
                
                         fs.writeFileSync("Orders.txt","Address: " +data.text);
                     });
                 };
             });
         };
     });
};

bot.on('message', function(data){ 
    if (data.type!='message')
        return;
    if (data.text=='wantPizza')
    {
        createOrder(data);
        bot.postMessageToChannel('general', 'Your order is ready');   
    }
});

const PORT=4390;

function handleRequest(request, response){
  response.end('Ngrok is working! -  Path Hit: ' + request.url);
}

const http = require('http');
var server = http.createServer(handleRequest);

server.listen(PORT);

