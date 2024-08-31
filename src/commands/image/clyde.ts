import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { Canvacord } from 'canvacord'

export default {
    data: new SlashCommandBuilder()
    .setName('clyde')
    .setDescription('make clyde(bot) say something')
    .addStringOption((option) => (
        option.setName('text')
        .setDescription('the text to say')
        .setRequired(true)
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const text = interaction.options.getString('text');
        const image = await Canvacord.clyde(text);
        const attachment = new AttachmentBuilder(image, {name:'clyde.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}