import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { Canvacord } from 'canvacord'

export default {
    data: new SlashCommandBuilder()
    .setName('facepalm')
    .setDescription('facepalm :|')
    .addUserOption((option) => (
        option.setName('user')
        .setDescription('the user')
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
        const image_URL = user.displayAvatarURL();
        const image = await Canvacord.facepalm(image_URL);
        const attachment = new AttachmentBuilder(image, {name:'fp.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}