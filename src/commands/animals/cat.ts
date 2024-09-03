import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Get a random cat image"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        let embed = new EmbedBuilder()
            .setTitle("Cat")
            .setColor("Random")
            .setTimestamp()

        await fetch("https://api.thecatapi.com/v1/images/search")
        .then(res => res.json())
        .then(data => {
            embed.setImage(`${data[0].url}`)
            interaction.editReply({ embeds: [embed] })
        });
    },
};