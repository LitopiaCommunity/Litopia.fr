const Discord = require('discord.js');
const Token = require('./token.json');
const fetch = require('node-fetch');

const has= (a,b)=> {
    for(let c in a) {
        if(b.includes(a[c])) return c;
    } return false;
};
const cap=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPlayerNumberPromise(contextBot) {
    let res = await fetch('https://api.mcsrvstat.us/2/play.litopia.fr')
    res = await res.json()
    await contextBot.user.setActivity('Litopia '+ res.players.online + '/' + res.players.max)
}

global.bot.client = new Discord.Client();



global.bot.client.login(Token.token);

global.bot.client.on('ready', () => {
    console.log(`Logged in as ${global.bot.client.user.tag}!`);
    setInterval(function (){
        getPlayerNumberPromise(global.bot.client).then(r => console.log('Update Player Number'))
    },10*1000)
});
    
    
global.bot.client.on('message', (message)=> {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }

    if(message.author.bot) { //on ignore les bots
        return false;
    } else {
        let badWords= ["salope ","chiennasse ","fils de pute ","ta mère la tchoin ","tg ","bougnoule ","bicot ","bougnoul ","bougnoulie ","bougnoulisation ","bougnouliser ","bounioul ","enculé de ta race ","fils de pute ","garage à bite "];
	let isBad= has(badWords, message.content.toLowerCase());
        if(isBad) {
            message.delete();
            message.channel.send(`«*${cap(badWords[isBad])}*» est un **gros mot**\n **Et c'est mal m'voyez**`);
        }
    }
});

global.bot.client.on('messageReactionAdd', (reaction, user) => {
});

/*
global.bot.client.on('raw', async packet => {
    
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    
    // Grab the channel to check the message from
    const channel = await global.bot.client.channels.fetch(packet.d.channel_id);
    console.log(channel);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
        
    // Since we have confirmed the message is not cached, let's fetch it
    channel.messages.fetch(packet.d.message_id).then(message => {
        console.log("at");
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.resolveID(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        //if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        console.log("here");
        if (packet.t == 'MESSAGE_REACTION_ADD') {
            console.log(reaction);
            global.bot.client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t == 'MESSAGE_REACTION_REMOVE') {
            global.bot.client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    }).catch(e =>{
        return(e);
    });
});


global.bot.client.on('messageReactionAdd', (reaction, user) =>{
    console.log("yeay !");
});
/*

global.bot.client.on('messageReactionRemove', (reaction, user) =>{
    let guild=reaction.message.guild;
    if(reaction.message.channel.id === "605840372404584448" && guild.member(user).id!=='575017188080091137'){
        //roleRemove.main(reaction, user, guild);
    }
});

global.bot.client.on('messageReactionAdd', async(reaction, user) => {
    console.log(reaction);
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
*/
