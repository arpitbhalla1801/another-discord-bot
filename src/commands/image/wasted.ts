import { Canvacord } from "canvacord";
import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('wasted')
    .setDescription("waste someone (GTA)")
    .addUserOption((option) => (
        option.setName('user')
        .setDescription('the target user')
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        
        const user = interaction.options.getUser('user') || interaction.user;
        const userImage = user.displayAvatarURL();
        const image = await Canvacord.wasted(userImage);
        // console.log(image);
        const attachment = new AttachmentBuilder(image, {name:'blur.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}