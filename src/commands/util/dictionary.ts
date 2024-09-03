import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("dictionary")
    .setDescription("Search for a word in the urbandictionary")
    .addStringOption((option) => option.setName("word").setDescription("The word to search for").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        
        await interaction.deferReply();

        const word = interaction.options.getString("word");

        let embed = new EmbedBuilder()
        .setTitle(`${word}`)
        .setColor("Random")
        .setTimestamp()



        await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`)
        .then(res => res.json())
        .then(async data => {
            embed.setDescription(`**Definition:** ${data.list[0].definition}`)
            embed.setFooter({ text: `👍: ${data.list[0].thumbs_up} | 👎: ${data.list[0].thumbs_down}`});
            embed.setURL(data.list[0].permalink);
            await interaction.editReply({ embeds: [embed] });
        });
    },
};