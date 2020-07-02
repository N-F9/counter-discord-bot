const { embed, error } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
	name: 'reset',
	description: 'Resets the counter',
	execute(message, args) {
    const data = db.get("guilds").find({ guildId: message.guild.id }).value()

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      error("Insufficient Permissions, the guild owner is the only one that can run this command!", message.channel)
      return
    } else {
      embed({"title": "Reset", "description": "The Counter has been reset!", "color": 0x00FF00}, message.channel)
      db.get('guilds')
        .find({ guildId: message.guild.id })
        .update('count', n => n - n)
        .write()
    }
	},
}