import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
export default {
    data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('flips a coin!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const heads_or_tails: string[] = ['heads', 'tails'];
        const res: string = heads_or_tails[Math.floor(Math.random() * heads_or_tails.length)];

        const embed: EmbedBuilder = new EmbedBuilder()
        .setDescription(`You flipped _${res}_!`)
        .setTimestamp()
        .setColor('Random')

        await interaction.editReply({
            embeds: [embed]
        })

    }
}