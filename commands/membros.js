const discord = require('discord.js') 

module.exports.run = async (client, msg, args) => {
    msg.delete().then(err => console.log(`err delete`))

    let on = client.users.cache.filter(m => {
        return m.presence.status === "online" && m.bot === false
    })
    let npertube = client.users.cache.filter(m => {
        return m.presence.status === "dnd" && m.bot === false
    })
    let ausente = client.users.cache.filter(m => {
        return m.presence.status === "idle" && m.bot === false
    })
    let invisible = client.users.cache.filter(m => {
        return m.presence.status === "offline" && m.bot === false
    })
    
    let embed = new discord.MessageEmbed()
    .setTitle('Membros alcançados: ')
    .setDescription(`
    
    Online: **${on.size}**
    Npertubar: **${npertube.size}**
    Ausentes: **${ausente.size}**
    offline: **${invisible.size}**`)
    .setColor('#00C0D9')
    .setFooter('Bot de divulgação desenvolvido por zeni')
    .setTimestamp()

    await msg.channel.send(embed).then(message => {
        message.delete({ timeout: 20000 })
    })
}