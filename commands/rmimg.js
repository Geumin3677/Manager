const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const fs = require('fs');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('이미지삭제')
		.setDescription('이미지삭제.'),

    async execute(interaction, client) {

        if(interaction.member.permissionsIn(message.channel).has("ADMINISTRATOR"))
        {
            interaction.reply({ content: '권한이 부족합니다.', ephemeral: true })
            return
        }

        var jsonBuffer = fs.readFileSync('./data.json')
        var dataJson = jsonBuffer.toString();
        var data = JSON.parse(dataJson);

        if(interaction.channel.id in data.img)
        {
            delete data.img[interaction.channel.id]
            const datastr = JSON.stringify(data, null, '\t');
            fs.writeFileSync('./data.json', datastr);

            await interaction.channel.messages.fetch({ limit: 2 }).then(messages => {
                var a = 0
                messages.forEach(element => {
                    if(a == 1)
                    {
                        element.delete()
                    }
                    a += 1
                })
            })

            interaction.reply({ content: '삭제 성공', ephemeral: true })
        }
        else
        {
            interaction.reply({ content: '등록 되어있는 이미지가 없습니다', ephemeral: true })
        }
    }
}