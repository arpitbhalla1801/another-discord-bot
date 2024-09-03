import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get the avatar of a user")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to get the avatar of")
                .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const avatarUrl = user.displayAvatarURL({ size: 1024 });
        await interaction.reply({
            files: [avatarUrl],
        });
    },
};