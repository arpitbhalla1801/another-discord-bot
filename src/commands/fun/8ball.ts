import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8ball a question!')
    .addStringOption((option: SlashCommandStringOption) => (
        option.setName('question')
        .setDescription('ask your question')
        .setRequired(true)
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const question: string | null = interaction.options.getString('question');
        let answer: string = "";

        await fetch('https://www.eightballapi.com/api')
        .then(res => res.json())
        .then(async result => {
            answer = result?.reading;
        })

        const embed = new EmbedBuilder()
        .setColor('Random')
        .addFields({name: 'your question', value: `${question}`}, {name: 'my response', value: `${answer}` })
        .setTimestamp()


        await interaction.editReply({
            embeds: [embed]
        });
    }
}