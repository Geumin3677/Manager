const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json')
const fs = require('fs')

// Create a new client instance
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

//커맨드 로딩
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
// Initialize the invite cache
//const invites = new Collection();

// A pretty useful method to create a delay without blocking the whole script.
//const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {
    /*
    // "ready" isn't really ready. We need to wait a spell.
    await wait(1000);
    // Loop over all the guilds
    client.guilds.cache.forEach(async (guild) => {
        // Fetch all Guild Invites
        const firstInvites = await guild.invites.fetch();
        // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });
    */
	console.log('Ready!');
});

client.on('messageCreate', async message => {
    if(message.author.bot) return
    if(message.channel.id == '946344437687148544')
    {
        message.reply('우선 #자주하는 질문 채널을 참고해주세요')
    }
    var jsonBuffer = fs.readFileSync('./data.json')
    var dataJson = jsonBuffer.toString();
    var data = JSON.parse(dataJson);
    if(message.channel.id in data.img)
    {
        await message.channel.messages.fetch({ limit: 2 }).then(messages => {
            var a = 0
            messages.forEach(element => {
                if(a == 1)
                {
                    element.delete()
                }
                a += 1
            })
        })
        
        message.channel.send(data.img[message.channel.id].url)

    }
})

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction) return

        if(!interaction.isCommand()) return
        //커맨드 불러오기
        const command = client.commands.get(interaction.commandName);
        //존재하지 않는 커맨드일시 리턴
        if (!command) return;
        //봇일시 리턴
        if(interaction.user.bot) return;
        //커맨드 실행
        
        await command.execute(interaction, client);
    }
    catch(error) {
        console.log(error)
    }
});
/*

client.on("guildMemberAdd", async (member) => {
    // To compare, we need to load the current invite list.
    const newInvites = await member.guild.invites.fetch()
    // This is the *existing* invites for the guild.
    const oldInvites = invites.get(member.guild.id);
    // Look through the invites, find the one for which the uses went up.
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = await client.users.fetch(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "join-logs");
    // A real basic message with the information we need. 
    inviter
      ? logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`)
      : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
});

client.on("guildCreate", (guild) => {
    // We've been added to a new Guild. Let's fetch all the invites, and save it to our cache
    guild.invites.fetch().then(guildInvites => {
      // This is the same as the ready event
      invites.set(guild.id, new Map(guildInvites.map((invite) => [invite.code, invite.uses])));
    })
});
  
client.on("guildDelete", (guild) => {
    // We've been removed from a Guild. Let's delete all their invites
    invites.delete(guild.id);
});

client.on("inviteDelete", (invite) => {
    // Delete the Invite from Cache
    invites.get(invite.guild.id).delete(invite.code);
});
  
client.on("inviteCreate", (invite) => {
    // Update cache on new invites
    console.log('asdf')
    invites.get(invite.guild.id).set(invite.code, invite.uses);
});
*/

// Login to Discord with your client's token
client.login(token);