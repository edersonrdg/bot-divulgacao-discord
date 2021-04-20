exports.run = (client, message, args) => {
    const a = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=27648&scope=bot`;
  
    message.channel.send(a).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 10000)
    });
    message.delete();
  };