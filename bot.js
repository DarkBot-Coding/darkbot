
const now = require('performance-now');

const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('--------------------------------------------------------------------------------');
  console.log('[!] Starting bot, Please Wait');
  console.log('[!] Prefix: darkbot/mod/owner, ');
  console.log('[i] We are on ' + bot.guilds.size + ' Servers');
  console.log("[i] Server's Names: " + bot.guilds.array().map(g => g.name).join(', '))
  console.log("[i] Legend: [i] = Information [!] = Important [C] = Command")
  console.log('--------------------------------------------------------------------------------');
  bot.user.setStatus("online", "Serving " + bot.users.size + " Users On " + bot.guilds.size + " Servers And " + bot.channels.size + " Channels");
});

// create an event listener for messages
bot.on('message', message => {
  let prefix = "//";
  if(message.author.bot) return;
  if (!message.guild) {
  message.reply("I'm sorry, but i don't work on Private Messages :smiley:")
  console.log('[C] ' + message.author.username + ' typed something on PM')
  }
  else {
    if (message.content.toLowerCase().startsWith(prefix + 'ping')) {
        console.log('[C] ' + message.author.username + ' used  ping on ' + message.guild.name)
        var startTime = now();
        message.channel.sendMessage("Ping Started")
            .then(message => {
                var endTime = now();
                return message.edit(`Ping took ${(endTime - startTime).toFixed(3)} ms.`);
            }).catch(console.error);
    }
    if (message.content.toLowerCase() === prefix+'inviteme') {
      message.reply('Just click here and select a server! :) https://goo.gl/am2cBq');
      console.log('[C] ' + message.author.username + ' used  inviteme on ' + message.guild.name)
    }
    if (message.content.toLowerCase() === prefix+'joindiscord') {
      message.reply('Join my discord server :smiley: https://discord.gg/474Hgvx');
      console.log('[C] ' + message.author.username + ' used  joindiscord on ' + message.guild.name)
    }
    if (message.content.toLowerCase() === prefix+'quotes') {
      message.channel.sendCode("none", "Please dont,One dumb bot is enough xD Keep yours sane :P\n-GoggleBot 13/09/2016\n\nsex is like software, its better when its free\nPosted by ProXyy on the 22/09/2016\n Source:linus torvalds\n\nImagine if androids were programmed to say Trust me, I'm an android after they finish talking lol\nOfficer: Are you human?\nAndroid: Yes, I am. Trust me, I'm an android.\nBy: Zuris on the 24/09/2016")
      console.log('[C] ' + message.author.username + ' used  quotes on ' + message.guild.name)
    }
    if (message.content.toLowerCase() === prefix+'stats') {
      var date = new Date(bot.uptime);
      var str = '';
      str += date.getUTCDate()-1 + " days, ";
      str += date.getUTCHours() + " hours, ";
      str += date.getUTCMinutes() + " minutes, ";
      str += date.getUTCSeconds() + " seconds, ";
      str += date.getUTCMilliseconds() + " millis";
        message.channel.sendCode('none','DarkBot Stats\n\n' + 'Uptime: ' + str + '\nUsers: ' + bot.users.size + '\nServers: ' + bot.guilds.size + '\nChannels: ' + bot.channels.size);
        console.log('[C] ' + message.author.username + ' used //stats on ' + message.guild.name)
    }
    if (message.content.toLowerCase() === prefix+'github') {
      message.reply("Check our github: https://github.com/DarkBot-Coding/darkbot")
      console.log('[C] ' + message.author.username + ' used /github on ' + message.guild.name)
    }
    if (message.content.toLowerCase() === prefix+'site') {
      message.reply("Check our site: http://darkbot.darknexus.tk/")
      console.log('[C] ' + message.author.username + ' used  site on ' + message.guild.name)
    }
    if (message.content.toLowerCase().startsWith(prefix+'ban') && message.member.roles.filter(r=>r.hasPermission('BAN_MEMBERS')).size > 0) {
    message.reply("Banned " + message.mentions.users.first())
    console.log('[C] ' + message.author.username + ' Banned ' + message.mentions.users.first() + ' On ' + message.guild.name)
    message.guild.ban(message.mentions.users.first(), "7");
  }
  if (message.content.toLowerCase().startsWith(prefix+'restart') && message.author.id === '156093486053982208') {
    bot.user.setUsername('DarkBot MK.1')
    .then(user => console.log(`My new username is ${user.username}`))
    bot.user.setStatus("online", "Serving " + bot.users.size + " Users On " + bot.guilds.size + " Servers And " + bot.channels.size + " Channels");
    console.log("Game Reset")
  }
  if (message.content.toLowerCase().startsWith(prefix+'help')) {
      message.channel.sendMessage("Check the help on our site :smiley: http://darkbot.darknexus.tk/commands.html")
      console.log('[C] ' + message.author.username + ' used  help on ' + message.guild.name)
  }
  if (message.content.toLowerCase().startsWith(prefix+'restart') && message.author.id === '156093486053982208') {
      console.log('[C] ' + message.author.username + ' shut down bot on ' + message.guild.name)
      message.channel.sendMessage(":wave:")
      process.exit();
  }
  if (message.content.toLowerCase().startsWith(prefix+'kick') && message.member.roles.filter(r=>r.hasPermission('KICK_MEMBERS')).size > 0) {
  message.reply("Kicked " + message.mentions.users.first())
  console.log('[C] ' + message.author.username + ' Kicked ' + message.mentions.users.first() + ' On ' + message.guild.name)
  message.guild.member(message.mentions.users.first()).kick();
}
if (message.content.toLowerCase().startsWith(prefix+'userinfo')) {
console.log('[C] ' + message.author.username + ' Used //userinfo On ' + message.guild.name)
message.channel.sendCode('none', message.author.username +  " 's Info'\n\n" + "Name: "  + message.author.username + "\nAvatar: ");
message.channel.sendMessage(message.author.avatarURL)
}
  }

});

// Create an event listener for new guilds added
bot.on("guildCreate", function(server) {
  console.log("[i] I have been added to " + server.name + " Server, the owner's id is " + server.owner.user.id);
  server.defaultChannel.sendMessage("I've been invited to this server,need help? visit my site http://darkbot.darknexus.tk/");
})

// Create an event listener for guilds deleted
bot.on("guildDelete", function(server) {
  console.log("[i] I have been removed from " + server.name + " Server");
})

// log our bot in
bot.login('token');
