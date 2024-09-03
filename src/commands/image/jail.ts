import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { Canvacord } from "canvacord";

export default {
    data: new SlashCommandBuilder()
        .setName('jail')
        .setDescription('put someone behind bars')
        .addUserOption(option => option.setName('user').setDescription('The user to jail')),
    async execute(interaction: ChatInputCommandInteraction) {

        await interaction.deferReply();
        
        const user = interaction.options.getUser('user') || interaction.user;
        const image_URL = user.displayAvatarURL({extension: 'png'});
        const image = await Canvacord.jail(image_URL);
        const attachment = new AttachmentBuilder(image, {name:'jail.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}