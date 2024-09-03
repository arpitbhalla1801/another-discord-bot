import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("dog")
        .setDescription("Get a random dog image"),
    async execute(interaction: ChatInputCommandInteraction) {

        await interaction.deferReply();

        let embed = new EmbedBuilder()
            .setTitle("Dog")
            .setColor("Random")
            .setTimestamp()

        await fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(data => {
            embed.setImage(`${data.message}`)
            interaction.editReply({ embeds: [embed] })
        });
    },
};