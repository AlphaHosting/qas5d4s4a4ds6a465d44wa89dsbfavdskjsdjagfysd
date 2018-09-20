const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');
const prefix = '.'

client.on('ready', function(){	
    var ms = 40000 ;
    var setGame = ['In Maintenance ','In Maintenance'];	
    var i = -1;	
    var j = 0;	
    setInterval(function (){	
        if( i == -1 ){	
j = 1;	
       }	
        if( i == (setGame.length)-1 ){	
            j = -1;	
      }	
       i = i+j;	
        client.user.setGame(setGame[i],`https://www.twitch.tv`);	
}, ms);	
	
});



  client.on('message', message => {
     if (message.content === (prefix + "bot")) {
         if(!message.channel.guild) return;
     let embed = new Discord.RichEmbed()
  .setColor("#8650a7")
  .addField("** ✅ Servers: **" , client.guilds.size)
  .addField("** ✅ Users: **" , client.users.size)
  .addField("** ✅ Channels: **" , client.channels.size)
  .addField("** 🚀 Ping **" , Date.now() - message.createdTimestamp)
  .setFooter("In Maintenance")
    .setTimestamp()
  message.channel.sendEmbed(embed);
    }
});





client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setFooter(`Quran Bot`)
  .setDescription(`**شكراً لك لإضافه بوت القرآن الى سيرفرك**`)
      guild.owner.send(embed)
});



client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setFooter(`bot in ${client.guilds.size}`)
  .setDescription(`**تم إضافة البوت الى سيرفر جديد**
server name : ${guild.name}
server owner : ${guild.owner}
server id : ${guild.id}`)
  client.users.get('348555232529219585').send(embed)
  });
  
client.on('guildDelete', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setFooter(`bot in ${client.guilds.size}`)
  .setDescription(`**تم طرد البوت :/**
server name : ${guild.name}
server owner : ${guild.owner}`)
  client.users.get('348555232529219585').send(embed)
  });


const developers = ["348555232529219585","444339372884754435"]
const adminprefix = ".";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**Done.   ${argresult}**`)
  } else 
     if (message.content === (adminprefix + "leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**Done.   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**Done.   ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**Done.**`)
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});



client.on('message', message => {
  if(message.content === '.invite') {
  const embed = new Discord.RichEmbed()
  .setTitle('Click Here To Add Me')
  .setURL('https://discordapp.com/api/oauth2/authorize?client_id=472952619623645184&permissions=49806401&scope=bot')
  .setFooter('Quran Bot')
  .setColor('RANDOM')
  message.channel.send({embed: embed});
  }
});

client.on('message', message => {
  if(message.content === '.vote') {
  const embed = new Discord.RichEmbed()
  .setTitle('Vote For Quran Bot')
  .setURL('https://discordbots.org/bot/472952619623645184')
  .setFooter('Quran Bot')
  .setColor('RANDOM')
  message.channel.send({embed: embed});
  }
});






	
	
client.on('message', message => {
  if(message.content === ".help") {
    message.channel.send(`In Maintenance `)	  
}
	    
});




client.on('message' , message => {
var prefix = "."

if (message.author.bot) return;
if (message.content.startsWith(".contact")) {
if (!message.channel.guild) return;



let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.reply('**أكتب رسالتك !**').then(msg => msg.delete(10000))
        message.delete();



client.users.get("348555232529219585").send(
    "\n" + "**" + "● السيرفر :" + "**" +
    "\n" + "**" + "» " + message.guild.name + "**" +
    "\n" + "**" + " ● المرسل : " + "**" +
    "\n" + "**" + "» " + message.author.tag + "**" +
    "\n" + "**" + " ● الرسالة : " + "**" +
    "\n" + "**" + args + "**")

let embed = new Discord.RichEmbed()
     .setAuthor(message.author.username, message.author.avatarURL)
     .setDescription('📬 تم ارسال الرسالة الى صاحب البوت بنجاح')
     .setThumbnail(message.author.avatarURL)
     .setFooter("By : BlackFire")
                                                

message.channel.send(embed);


}
    
});





client.on('message', message => {
if (message.author.bot) return;
if (message.content.startsWith('.adkar')) { 
message.channel.send(`In Maintenance`) 
}
});









client.login(process.env.BOT_TOKEN);
