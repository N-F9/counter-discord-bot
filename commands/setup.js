const { embed, error } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('../db.json')
const db = low(adapter)

module.exports = {
	name: 'setup',
	description: 'Sets up the channel',
	execute(message, args) {
    message.owner

    embed({"title": "Setup", "description": "The setup of counter bot has been successfully completed!"}, message.channel)
    db.get("guilds")
      .push({guildId: message.guild.id, suffix: "-", adminRole: "admin", count: 0})
      .write()
	},
}