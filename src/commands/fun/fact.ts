import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('gives you a random fact!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        await fetch("https://uselessfacts.jsph.pl/random.json?language=en").then(result => result.json()).then(async body => {
            const embed: EmbedBuilder = new EmbedBuilder()
            .setDescription(body?.text)
            .setColor('Random')
            .addFields({
                name: 'source', value: `${body?.permalink}`
            })
            .setTimestamp()

            await interaction.editReply({
                embeds: [embed]
            })
        })
    }
}