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
        let badWords= ["bite","fuck","saleau","couille","shit","salope","scheisse","sale eau","scheiße","schlampe","salo","salop","enculé","grossier ","péripatétitienne","truandaille","boursemol","puterelle","coureuse de remparts","casse couille","sodomite","fot-en-cul","tantouze","putte","reum","gourgandin","tête de noeud","nodocéphale","croquefedouille","sacripant ","orchidoclaste","ta mere","chiennasse","espece de","ferme la","ferme là","catin","boursemolle","mordiable","pute","cyka","blyat","salope","connard","ta mére","ta gueule","idi narouill","tzigan","suce","pute","kurwa","fushidara on'a","govnyouk","batard","fdp ","fils de pute","ta mère la tchoin","tchoin","fils d","ntm ","empafé","faquin","ntm","tg ","va chier","connard","connasse","sous merde","sous race","raclure de fond de chiotte","scheise ","prostipute","grosse merde"," pd ","bougnoule","putain","merde","fils d'unijambiste","fils de dracoc","ma mignonne","espèce d'elfe","rouquin va !  j'vais t'faire courir !","sac à merde","petite bite","abruti ","aller niquer sa mère ","aller se faire enculer ","aller se faire endauffer ","aller se faire foutre ","aller se faire mettre ","andouille ","appareilleuse ","assimilé ","astèque ","avorton ","bande d’abrutis ","bâtard ","bellicole ","bête ","bête à pleurer ","bête comme ses pieds ","bête comme un chou ","bête comme un cochon ","biatch ","bic ","bicot ","bite ","bitembois ","bitembois ","bordille ","boudin ","bouffon ","bougnoul ","bougnoule ","bougnoulie ","bougnoulisation ","bougnouliser ","bougre ","boukak ","boulet ","bounioul ","bourdille ","branleur ","bridé ","bridée ","brigand ","brise-burnes ","cacou ","cafre ","cageot ","caldoche ","casse-bonbon ","casse-couille ","casse-couilles ","cave ","chachar ","chagasse ","charlot de vogue ","chauffard ","chien de chrétien ","chiennasse ","chienne ","chier ","chinetoc ","chinetoque ","chintok ","chleuh ","chnoque ","citrouille ","coche ","colon ","con ","con comme la lune ","con comme ses pieds ","con comme un balai ","con comme un manche ","con comme une chaise ","con comme une valise sans poignée ","conasse ","conchier ","connard ","connarde ","connasse ","counifle ","courtaud ","crétin ","crevure ","cricri ","crotté ","crouillat ","crouille ","croûton ","débile ","doryphore ","doxosophe ","doxosophie ","drouille ","du schnoc ","ducon ","duconnot ","dugenoux ","dugland ","duschnock ","emmanché ","emmerder ","emmerdeur ","emmerdeuse ","empafé ","empapaouté ","enculé ","enculé de ta race ","enculer ","enfant de putain ","enfant de pute ","enfant de salaud ","enflure ","enfoiré ","envaselineur ","épais ","espèce de ","espingoin ","étron ","face de chien ","face de pet ","face de rat ","fdp  ","fell ","fils de bâtard ","fils de chien ","fils de chienne ","fils de garce ","fils de putain ","fils de pute ","fils de ta race ","fiotte ","folle ","fouteur ","fripouille ","frisé ","fritz ","fritz ","fumier ","garage à bite ","garce ","gaupe ","gdm ","gland ","glandeur ","glandeuse ","glandouillou ","glandu ","gnoul ","gnoule ","godon ","gogol ","goï ","gouilland ","gouine ","gourde ","gourgandine ","grognasse ","gueniche ","guide de merde ","guindoule ","halouf ","imbécile ","incapable ","islamo-gauchisme ","jean-foutre ","jeannette ","journalope ","khmer rouge ","khmer vert ","kikoo ","kikou ","kraut ","lâche ","lâcheux ","lavette ","lopette ","magot ","makoumé ","mal blanchi ","mange-merde ","mangeux de marde ","marchandot ","margouilliste ","marsouin ","mauviette ","melon ","merdaille ","merdaillon ","merde ","merdeux ","merdouillard ","michto ","minable ","minus ","misérable ","moinaille ","moins-que-rien ","monacaille"],
            isBad= has(badWords, message.content.toLowerCase());
        if(isBad) {
            message.delete();
            message.channel.send(`«*${cap(badWords[isBad])}*» est un **gros mot**\n **Et c'est mal m'voyer**`);
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
