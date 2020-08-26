const axios=require('axios');
var cheerio=require('cheerio');

require('dotenv').config();

const {Client, Message}= require('discord.js');
const client =new Client();

client.login(process.env.steezbot_token);

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in`);
})


client.on("message", function(message) {

    if(message.author.bot) return;
    if(message.content==='steezbot')
        message.channel.send('Yeet!');
 
    var parts = message.content.split(" ");
 

    if (parts[0] === "!image") {
 
        
        image(message, parts); 
 
    }
 
});
 
function image(message, parts) {
 
 
    var search = parts.slice(1).join(" "); 

    axios.get(`http://results.dogpile.com/serp?qc=images&q=${search}`,{
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    })
    
      .then((response)=>{
        const responseBody=response.data;
        $ = cheerio.load(responseBody); 

        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length)  return;
        
        message.channel.send(urls[0]);
        
    }, (error)=>{
        console.log(error);

    });

}

