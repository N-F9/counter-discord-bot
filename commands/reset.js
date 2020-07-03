const { embed, error } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
	name: 'reset',
	description: 'Resets the counter',
	execute(message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      error("Insufficient Permissions, you must have adminustrator role in order to run this command!", message.channel)
      return
    } else {
      embed({"title": "Reset", "description": "The Counter has been reset to 1!", "color": 0x3498db}, message.channel)
      db.read()
      db.get('guilds')
        .find({ guildId: message.guild.id })
        .update('count', n => n = 1)
        .update('lastMessagerId', n => n = "")
        .write()
    }
	},
}