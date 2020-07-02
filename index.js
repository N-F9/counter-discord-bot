const Discord = require('discord.js')
const client = new Discord.Client()
const id = require('./id.json')
const fs = require('fs');
const { log, } = require('./utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const prefix = '-' // TEMP

// ? | Sets up the Database

db.defaults({ guilds: [] })
  .write()

  /*
    {
      "guildId": "",
      "suffix": "-",
      "adminRole": "admin",
      "count": 0  
    }
  */

// ? | Gets the commands

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// ? | Loads the bot

client.once('ready', () => {
	log('Ready!')
})

// ? | Listens for messages

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  for (const c of client.commands) {
    if (command === c[1].name) {
      client.commands.get(c[1].name).execute(message, args);
    }
  }
})

client.login(id.token)

// embed({title: 'Pong.'}, message.channel);