const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const message = require("./events/message");

client.on("ready", async () => {
    message(client, config.prefix)
        
    client.user.setActivity('Zeni property', {
      type: 'PLAYING'
    })
    console.log(`${client.user.username} start with ${client.users.cache.size} members`)
});


client.login(process.env.TOKEN);   
