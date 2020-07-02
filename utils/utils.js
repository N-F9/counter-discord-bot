const { blue, gray, white } = require('chalk')

const utils = {
  log: message => console.log(`${blue(`Counter Bot`)} ${gray(`»`)} ${white(message)}`),
  embed: (embed, channel) => channel.send({ embed: embed })
}

module.exports = utils
