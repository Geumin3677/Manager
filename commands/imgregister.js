const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('이미지등록')
		.setDescription('이미지등록.'),

    async execute(interaction, client) {

        if(interaction.member.permissionsIn(message.channel).has("ADMINISTRATOR"))
        {
            interaction.reply({ content: '권한이 부족합니다.', ephemeral: true })
            return
        }
        var jsonBuffer = fs.readFileSync('./data.json')
        var dataJson = jsonBuffer.toString();
        var data = JSON.parse(dataJson);

        await interaction.channel.messages.fetch({ limit: 1 }).then(messages => {
            messages.forEach(element => {
                var Attachment = (element.attachments)
                if (Attachment){
                    Attachment.forEach(att => {
                        data.img[interaction.channel.id] = {
                            url : att.url
                        }
                    })
                }
            });
        })

        const datastr = JSON.stringify(data, null, '\t');
        fs.writeFileSync('./data.json', datastr);

        interaction.reply({ content: '등록 성공', ephemeral: true })
    }
}