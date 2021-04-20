const discord = require('discord.js')

module.exports.run = async (client, msg, args) => {

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
        
    const { on, ausente, npertube, invisible } = statusDiv
    
    const courrentDivOn = []
    const courrentDivOnfail = []

    const courrentDivDnd = []
    const courrentDivDndfail = []

    const courrentDivIdle = []
    const courrentDivIdlefail = []

    const courrentDivOff = []
    const courrentDivOfffail = []


    let divComlete = false

    msg.delete().catch(err => console.log('err delete'));

    let ids = ["791499784828616764", "828356728282152982", "262786804711686144", "704976761284460574", "477914849083523072", "262786804711686144"];

    if (!ids.includes(msg.author.id)) {
        return msg.channel.send('Voce nao possui perm, informe seu Id para Zeni')
    }

    let text = args.join(" ");

    if (!text) {
        return msg.reply("Me Diga Algo Para Mandar!");
    }

    on.forEach(member => {
        member.send(text).then(res => {
            courrentDivOn.push(member.id)
            console.log(`[Recebeu - online] - ${member.username}`)
        }).catch(err => {
            courrentDivOnfail.push(member.id)
            console.log(`[Nao recebeu - online] - ${member.username}`)
        })
    })

    npertube.forEach(member => {
        member.send(text).then(res => {
            courrentDivDnd.push(member.id)
            console.log(`[Recebeu - Npertube] - ${member.username}`)
        }).catch(err => {
            courrentDivDndfail.push(member.id)
            console.log(`[Nao recebeu - Npertube] - ${member.username}`)
        })
    })

    ausente.forEach(member => {
        member.send(text).then(res => {
            courrentDivIdle.push(member.id)
            console.log(`[Recebeu - ausente] - ${member.username}`)
        }).catch(err => {
            courrentDivIdlefail.push(member.id)
            console.log(`[Nao recebeu - ausente] - ${member.username}`)
        })
    })

    invisible.forEach(member => {
        member.send(text).then(res => {
            courrentDivOff.push(member.id)
            console.log(`[Recebeu - offline] - ${member.username}`)
        }).catch(err => {
            courrentDivOfffail.push(member.id)
            console.log(`[Nao recebeu - offline] - ${member.username}`)
        })
    })

    function createnewembed(courrentDivOn, courrentDivDnd, courrentDivIdle, courrentDivOff) {
        const restOn = on.size - courrentDivOn.length - courrentDivOnfail.length
        const restDnd = npertube.size - courrentDivDnd.length - courrentDivDndfail.length
        const restIdle = ausente.size - courrentDivIdle.length - courrentDivIdlefail.length
        const restOff = invisible.size - courrentDivOff.length - courrentDivOfffail.length

        if (restOff === 0) {
            divComlete = true

            let finalyEmbed = new discord.MessageEmbed()
                .setTitle('Divulgação concluída: ')
                .setDescription(`
            **Informações sobre a divulgação**
            
            Online recebidos: **${courrentDivOn.length}**
            Npertube recebidos: **${courrentDivDnd.length}**
            Ausente recebidos: **${courrentDivIdle.length}**
            Offline recebidos: **${courrentDivOff.length}**
            `)
                .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor('#00C0D9')
                .setFooter('Bot de divulgação desenvolvido por zeni')
                .setTimestamp()

            return finalyEmbed
        }

        let embedDiv = new discord.MessageEmbed()
            .setTitle(`Informações de divulgação: `)
            .setDescription(`
        **Total de ${client.users.cache.size} membros em ${client.guilds.cache.size} servidores**
        
        Restante Online: **${restOn}** 
        Restante Ocupado: **${restDnd}** 
        Restante Ausente: **${restIdle}** 
        Restante Offline: **${restOff}**
        
        `)
            .setColor('#00C0D9')
            .setFooter('Bot de divulgação desenvolvido por zeni')
            .setTimestamp()

        return embedDiv
    }

    await msg.channel.send(createnewembed(courrentDivOn, courrentDivDnd, courrentDivIdle, courrentDivOff)).then(message => {
        const t = setInterval(() => {
            if (divComlete == true) {
                clearInterval(t)
                return message.edit(createnewembed(courrentDivOn, courrentDivDnd, courrentDivIdle, courrentDivOff)).then(res => {
                    res.delete({ timeout: 20000 })
                })
            }
            message.edit(createnewembed(courrentDivOn, courrentDivDnd, courrentDivIdle, courrentDivOff))
        }, 3000)
    })
};