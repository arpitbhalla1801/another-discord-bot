import { Canvacord } from "canvacord";
import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription("delete someone")
    .addUserOption((option) => (
        option.setName('user')
        .setDescription('the target user')
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        
        const user = interaction.options.getUser('user') || interaction.user;
        const userImage = user.displayAvatarURL();
        const image = await Canvacord.delete(userImage, true);
        // console.log(image);
        const attachment = new AttachmentBuilder(image, {name:'delete.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}