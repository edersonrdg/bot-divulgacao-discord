module.exports = (client, prefix) => {
    client.on('message', message => {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    
        const args = message.content
            .trim().slice(prefix.length)
            .split(/ +/g);
        const command = args.shift().toLowerCase();
    
        console.log(`${message.author.username} - fez o comando ${command}`)
        try {
            const commandFile = require(`../commands/${command}.js`)
            commandFile.run(client, message, args);
        } catch (err) {
            console.error('Erro:' + err);
        }
    });
}