import { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('some free advice!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await fetch('https://api.adviceslip.com/advice').then((res) => res.json()).then(async advice => {
            let embed = new EmbedBuilder()
            .setDescription(`${advice.slip.advice}`)
            .setColor('Random')
            .setTimestamp()

            await interaction.reply({
                embeds: [embed]
            })
        })
    }
}