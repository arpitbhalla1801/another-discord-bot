import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Canvacord } from 'canvacord';

export default {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Generate a YouTube comment')
        .addStringOption(option => option.setName('content').setDescription('The content of the YouTube comment').setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const username = interaction.user?.username;
        const avatar = interaction.user?.displayAvatarURL({ extension: 'png' });
        const content = interaction.options.getString('content');

        const image = await Canvacord.youtube({username, avatar, content, dark: true});
        const attachment = new AttachmentBuilder(image, { name: 'youtube.png' });
        await interaction.editReply({ files: [attachment] });
    }
}