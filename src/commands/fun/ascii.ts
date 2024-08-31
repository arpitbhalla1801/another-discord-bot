import { ChatInputCommandInteraction, codeBlock, SlashCommandBuilder } from 'discord.js';
import { textSync } from 'figlet';


export default {
    data: new SlashCommandBuilder()
    .setName('ascii')
    .setDescription('converts the given text to ascii art')
    .addStringOption((option) => (
        option.setName('text')
        .setDescription('text to convert (20 characters or less)')
        .setRequired(true)
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const text: any = interaction.options.getString('text')?.toString();
        const ascii_art = codeBlock('Ascii', textSync(text));

        // let embed = new EmbedBuilder()
        // .setDescription(`${ascii_art}`)
        // .setColor('Random')
        // .setTimestamp()

        await interaction.editReply(ascii_art)
    }
}