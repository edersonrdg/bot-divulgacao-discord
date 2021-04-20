const discord = require('discord.js')

exports.run = async (client, message, args) => {
message.delete();
    const guilds = client.guilds.cache.map((guild) => {
      return `\n${guild.name}`
    })
  
    let embed = new discord.MessageEmbed()
    .setTitle('Servidores: ')
    .setDescription(`
    **${guilds}**`)
    .setColor('#00C0D9')
    .setFooter('Bot de divulgação desenvolvida por zeni')
    .setTimestamp()

    await message.channel.send(embed).then(message => {
        message.delete({ timeout: 20000 })
    })
  };