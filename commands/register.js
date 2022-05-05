const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('유저등록')
		.setDescription('유저등록.')
        .addStringOption(option => option.setName('닉네임').setDescription('닉네임').setRequired(true)),

    async execute(interaction, client) {
        var jsonBuffer = fs.readFileSync('./data.json')
        var dataJson = jsonBuffer.toString();
        var data = JSON.parse(dataJson);

        const value = interaction.options._hoistedOptions[0].value

        data.users.push(value)

        const datastr = JSON.stringify(data, null, '\t');
        fs.writeFileSync('./data.json', datastr);

        interaction.reply({ content: '등록 성공', ephemeral: true })
    }
}