const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { guildId } = require('../config.json')

const fs = require('fs');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('인증')
		.setDescription('인증을 합니다.'),

    async execute(interaction, client) {
        var jsonBuffer = fs.readFileSync('./data.json')
        var dataJson = jsonBuffer.toString();
        var data = JSON.parse(dataJson);

        if(data.users.includes(interaction.user.username))
        {
            const guild = client.guilds.cache.get(guildId)
            const role = guild.roles.cache.find(r => r.id === '949966629352132618')
            interaction.member.roles.add(role)
            interaction.reply({ content: '인증 성공', ephemeral: true })
        }
        else
        {
            interaction.reply({ content: '인증 실패', ephemeral: true })
        }
    }
}