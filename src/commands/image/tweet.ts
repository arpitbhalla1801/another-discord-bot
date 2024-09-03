import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("tweet")
        .setDescription("Generates a fake tweet")
        .addStringOption((option) => option.setName('message').setDescription('The message to generate a tweet from').setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        let username = interaction.user.username;
        let message = interaction.options.getString("message");
    

        let embed = new EmbedBuilder()
            .setTitle('Tweet')
            .setColor("Random")
            .setTimestamp()

        await fetch("https://nekobot.xyz/api/imagegen?type=tweet&username=" + username + "&text=" + message)
        .then(res => res.json())
        .then(data => {
            embed.setImage(data.message)
            interaction.editReply({ embeds: [embed] })
        });
    },
};