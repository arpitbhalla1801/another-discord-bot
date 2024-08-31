import { Canvacord } from "canvacord";
import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('blur')
    .setDescription("blur someone's pfp")
    .addUserOption((option) => (
        option.setName('user')
        .setDescription('the target user')
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        
        const user = interaction.options.getUser('user') || interaction.user;
        const userImage = user.displayAvatarURL();
        const image = await Canvacord.blur(userImage);
        // console.log(image);
        const attachment = new AttachmentBuilder(image, {name:'blur.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}