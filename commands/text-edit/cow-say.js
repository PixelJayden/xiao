const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class CowSayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cow-say',
			group: 'text-edit',
			memberName: 'cow-say',
			description: 'Converts text to cow-say.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like the cow to say?',
					type: 'string',
					max: 1500
				}
			]
		});
	}

	async run(msg, { text }) {
		try {
			const { body } = await snekfetch
				.get('http://cowsay.morecode.org/say')
				.query({
					message: text,
					format: 'json'
				});
			return msg.code(null, body.cow);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
