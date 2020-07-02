module.exports = {
	name: 'setup',
	description: 'Sets up the channel',
	execute(message, args) {
    message.channel.send('P5ng.')
    console.log(message.guild.id)
	},
}