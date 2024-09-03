import { Canvacord } from "canvacord";
import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandUserOption } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("wanted")
    .setDescription("looks like there's a criminal on the loose")
    .addUserOption((option: SlashCommandUserOption) => option.setName("user").setDescription("The user to generate a wanted image for")),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const user = interaction.options.getUser("user") || interaction.user;
        const avatar = user.displayAvatarURL({ extension: "png" });
        const image = await Canvacord.wanted(avatar);
        const attachment = new AttachmentBuilder(image, {name: "wanted.png"});
        await interaction.editReply({ files: [attachment] });
    }
}