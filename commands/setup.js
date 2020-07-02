const { embed, error } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
	name: 'setup',
	description: 'Sets up the channel',
	execute(message, args) {
    if (message.guild.ownerID != message.author.id) {
      error("Insufficient Permissions, the guild owner is the only one that can run this command!", message.channel)
      return
    }
    if (db.get("guilds").find({ guildId: message.guild.id }).value() == undefined) {
      embed({"title": "Setup", "description": "Counter bot has been successfully setup!", "color": 0x00FF00}, message.channel)
      message.guild.channels.create("counting", "text").then(createdChannel => {
        db.get("guilds").push({ guildId: message.guild.id, count: 0, counterChannelId: createdChannel.id }).write()
        createdChannel.setTopic(`Current Number: ${db.get('guilds').find({ guildId: message.guild.id }).value().count}`)
      })
    } else {
      error("Server has already been setup!", message.channel)
      return
    }
	},
}