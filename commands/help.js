const { embed } = require('../utils/utils')

module.exports = {
	name: 'help',
	description: 'Sends the help menu',
	execute(message, args) {
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