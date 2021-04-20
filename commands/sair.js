module.exports.run = async (client, message, args) => {
    message.delete();
    await client.guilds.cache.forEach(async server => {
        await server
          .leave()
          .then(a => console.log(`Sai do server: ${server.name}`));
    });
  };