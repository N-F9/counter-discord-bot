const { blue, gray, white } = require('chalk')

const utils = {
  log: message => console.log(`${blue(`Counter Bot`)} ${gray(`»`)} ${white(message)}`),
  embed: (embed, channel) => channel.send({ embed: embed }),
  error: (code, channel) => channel.send({embed: {"title": `Error`, "description": `Error: ${code}`, "color": 0xff0033}})
}

module.exports = utils
