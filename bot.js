const now = require('performance-now')

const Discord = require('discord.js');

const mysql = require('mysql');

const bot = new Discord.Client();

var connection = mysql.createConnection({
  host: "serverip",
  user: "user",
  password: "password",
  database: "darkbot"
});
connection.connect();

bot.on('ready', () => {
  console.log('--------------------------------------------------------------------------------');
  console.log('[!] Starting bot, Please Wait');
  console.log('[!] Connecting to MySQL Database');
  console.log('[!] Prefix: ..');
  console.log('[i] We are on ' + bot.guilds.size + ' Servers');
  console.log("[i] Server's Names: " + bot.guilds.array().map(g => g.name).join(', '))
  console.log("[i] Legend: [i] = Information [!] = Important [C] = Command [SQL] = MySQL Query")
  console.log('--------------------------------------------------------------------------------');
  bot.user.setStatus("online", "We are on: " + bot.guilds.size + " Servers" + " With " + bot.users.size + " Users");
});

bot.on("guildCreate", function(server) {
  console.log("[i] I have been added to " + server.name + " Server, the owner's id is " + server.owner.user.id);
  console.log("[SQL] Trying to insert server " + server.name + " into database");
  server.defaultChannel.sendMessage("I've been invited to this server,need help? visit my site http://darknexus.tk/");
  var info = {
    "serverid": server.id,
    "servername": "" + server.name + "",
    "ownerid": server.owner.user.id,
  }

  connection.query("INSERT INTO servers SET ?", info, function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server Inserted Into The Database!");
  })
})

bot.on("guildDelete", function(server) {
  console.log("[i] I have been removed from " + server.name + " Server");
  console.log("[SQL] Attempting to remove " + server.name + " from the database!");
  connection.query("DELETE FROM servers WHERE serverid = '" + server.id + "'", function(error) {
    if (error) {
      console.log(error);
      return;
    }
    console.log("Server Removed From The Database!");
  })
})

bot.on('message', message => {
  if (message.content === '..ping') {
      console.log('[C] ' + message.author.username + ' used ..ping on ' + message.guild.name)
      var startTime = now();
      message.channel.sendMessage("Ping Started")
          .then(message => {
              var endTime = now();
              return message.edit(`Ping took ${(endTime - startTime).toFixed(3)} ms.`);
          }).catch(console.error);
  }
});

bot.on('message', message => {
  if (message.content === '..inviteme') {
    message.reply('Just click here and select a server! :) https://discordapp.com/oauth2/authorize?&client_id=224803728073424896&scope=bot&permissions=12659727');
    console.log('[C] ' + message.author.username + ' used ..inviteme on ' + message.guild.name)
    var invite = {
      "user": "" + message.author.username + "",
      "command": "..inviteme",
      "userid": "" + message.author.id + "",
    }

    connection.query("INSERT INTO commands SET ?", invite, function(error) {
      if (error) {
        console.log(error);
        return;
      }
    })

  }
});

bot.on('message', message => {
  if (message.content === '..joindiscord') {
    message.reply('Join my discord server :smiley: https://discord.gg/474Hgvx');
    console.log('[C] ' + message.author.username + ' used ..joindiscord on ' + message.guild.name)
    var discord = {
      "user": "" + message.author.username + "",
      "command": "..joindiscord",
      "userid": "" + message.author.id + "",
    }

    connection.query("INSERT INTO commands SET ?", discord, function(error) {
      if (error) {
        console.log(error);
        return;
      }
    })
  }
});

bot.on('message', message => {
  if (message.content === '..quotes') {
    message.channel.sendCode("none", "Please dont,One dumb bot is enough xD Keep yours sane :P\n-GoggleBot 13/09/2016\n\nsex is like software, its better when its free\nPosted by ProXyy on the 22/09/2016\n Source:linus torvalds")
    console.log('[C] ' + message.author.username + ' used ..quotes on ' + message.guild.name)
  }
});

bot.on('message', message => {
  if (message.content === 'anime') {
    message.reply("God you are one of those fucking weeaboos...")
  }
});


bot.on('message', message => {
  let warnRole = message.guild.roles.find("name", "Warn")
  if (message.content.startsWith('..warn') && message.member.roles.has(warnRole.id)) {
    message.reply("Warned " + message.mentions.users.first())
    console.log('[C] ' + message.author.username + ' Warned ' + message.mentions.users.first() + ' On ' + message.guild.name)
    var warn = {
      "user": "" + message.author.username + "",
      "command": "..warn",
      "userGotWarn": "" + message.mentions.users.first() + "",
    }

    connection.query("INSERT INTO warns SET ?", warn, function(error) {
      if (error) {
        console.log(error);
        return;
      }
    })
  }
});

bot.on('message', message => {
  if (message.content === '..stats') {
      message.channel.sendMessage('**BOT STATS**\n\n' + '**Users:** ' + bot.users.size + '\n**Servers:** ' + bot.guilds.size + '\n**Channels:** ' + bot.channels.size);
      console.log('[C] ' + message.author.username + ' used ..stats on ' + message.guild.name)
  }
});

bot.on('message', message => {
  if (message.content.startsWith('..github')) {
    message.reply("Check our github: https://github.com/DarkBot-Coding/darkbot")
    console.log('[C] ' + message.author.username + ' used ..github on ' + message.guild.name)
  }
});

bot.on('message', message => {
  if (message.content.startsWith('..trello')) {
    message.reply("Check our trello: https://trello.com/b/9poRgtbU/darkbot")
    console.log('[C] ' + message.author.username + ' used ..trello on ' + message.guild.name)
  }
});

bot.on('message', message => {
  let banRole = message.guild.roles.find("name", "Ban")
  if (message.content.startsWith('..ban') && message.member.roles.has(banRole.id)) {
    message.reply("Banned " + message.mentions.users.first())
    console.log('[C] ' + message.author.username + ' Banned ' + message.mentions.users.first() + ' On ' + message.guild.name)
    message.guild.ban(message.mentions.users.first(), "7");
  }
});

bot.on('message', message => {
  let banRole = message.guild.roles.find("name", "Ban")
  if (message.content.startsWith('..unban') && message.member.roles.has(banRole.id)) {
    message.reply("Unbanned " + message.mentions.users.first())
    console.log('[C] ' + message.author.username + ' Unbanned ' + message.mentions.users.first() + ' On ' + message.guild.name)
    message.guild.unban(message.mentions.users.first());
  }
});

bot.on('message', message => {
  if (message.content.startsWith('..restart') && message.author.id === '156093486053982208') {
    bot.user.setUsername('DarkBot MK.1')
    .then(user => console.log(`My new username is ${user.username}`))
    bot.user.setStatus("online", "We are on: " + bot.guilds.size + " Servers" + " With " + bot.users.size + " Users");
    console.log("Game Reset")
  }
});

bot.on('message', message => {
  if (message.content.startsWith('..help')) {
      message.channel.sendMessage("*DarkBot's Help*")
      message.channel.sendCode("none","..ping: Checks if bot is online and gives you Ping in MS\n..inviteme: Gives you and oauth link to invite the bot\n..joindiscord: Gives you a link to his discord\n..quotes: Shows some funny quotes\n..stats: Shows server stats\n..github: Gives you a link to our github\n..trello: Gives you a link to our trello")
      console.log('[C] ' + message.author.username + ' used ..help on ' + message.guild.name)
  }
});

bot.on('message', message => {
  if (message.content.startsWith('..die') && message.author.id === '156093486053982208') {
      console.log('[C] ' + message.author.username + ' shut down bot on ' + message.guild.name)
      message.channel.sendMessage(":wave:")
      process.exit();
  }
});

bot.login('token');
