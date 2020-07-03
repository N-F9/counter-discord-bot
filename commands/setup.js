const { embed, error } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
	name: 'setup',
	description: 'Sets up the channel',
	execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      error("Insufficient Permissions, you must have adminustrator role in order to run this command!", message.channel)
      return
    }
    db.read()
    if (db.get("guilds").find({ guildId: message.guild.id }).value() == undefined) {
      embed({"title": "Setup", "description": "Counter bot has been successfully setup! The counter starts at 1!", "color": 0x00FF00}, message.channel)
      message.guild.channels.create("counting", "text").then(createdChannel => {
        
        db.get("guilds").push({ guildId: message.guild.id, count: 1, counterChannelId: createdChannel.id, lastMessagerId: "" }).write()
        createdChannel.setTopic("Start counting!")
      })
    } else {
      error("Server has already been setup!", message.channel)
      return
    }
	},
}