import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("bear")
        .setDescription("Get a random bear image"),
    async execute(interaction: ChatInputCommandInteraction) {


        await interaction.deferReply();

        let embed = new EmbedBuilder()
            .setTitle("Bear")
            .setColor("Random")
            .setTimestamp()

        await fetch("https://bearapi.xyz/img/bear")
        .then(res => res.json())
        .then(data => {
            embed.setImage(`${data.image}`)
            interaction.editReply({ embeds: [embed] })
        }); 
    },
};