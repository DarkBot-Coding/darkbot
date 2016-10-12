
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
  bot.user.setStatus("online", "Recoding In Progress!");
});

// create an event listener for messages
bot.on('message', message => {
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

// log bot in
bot.login('token');
