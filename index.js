const Discord = require('discord.js')
const client = new Discord.Client()
const id = require('./id.json')
const fs = require('fs');
const { log, } = require('./utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Sets up the Database

db.defaults({ guilds: [] })
  .write()

// db.get('guilds')
//   .remove()
//   .write()

// Gets the commands

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

// Loads the bot

client.once('ready', () => {
	log('Ready!')
})

// Listens for messages

client.on('message', message => {
  // Commands
  let prefix = "-"
	if (message.content.startsWith(prefix) || message.author.bot) {
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    
    for (const c of client.commands) {
      if (command === c[1].name) {
        client.commands.get(c[1].name).execute(message, args)
      }
    }
    return
  }

  // Counter
  let data = db.get("guilds").find({ guildId: message.guild.id }).value()
	if (message.channel.id == db.get('guilds').find({ guildId: message.guild.id }).value()) {
    if (message.content == db.get('guilds').find({ guildId: message.guild.id }).value()) {
      db.get('guilds')
        .find({ guildId: message.guild.id })
        .update('count', n => n + 1)
        .write()
    }
    message.channel.setTopic(`Current Number: ${db.get('guilds').find({ guildId: message.guild.id }).value()}`)
  }
})

client.login(id.token)