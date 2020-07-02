const { embed } = require('../utils/utils')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = {
	name: 'help',
	description: 'Sends the help menu',
	execute(message, args) {
    const data = db.get("guilds").find({ guildId: message.guild.id }).value()
    embed({
      "title": "Help",
      "fields": [
        {
          "name": "General",
          "value": "\`GitHub\` [Repo](https://github.com/N-F9/counter-discord-bot)\n\`Author\` [Nick Ferguson](https://github.com/N-F9)"
        },
        {
          "name": "Commands",
          "value": "\`-reset\` To reset the server's counter \n\`-setup\` To setup the bot\n\`-help\` For the help command"
        }
      ],
      "color": 0x00FF00
    }, message.channel)
	},
}