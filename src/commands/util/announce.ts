import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Announce a message to a channel")
    .addStringOption(option => option.setName("message").setDescription("The message to announce").setRequired(true))
    .addChannelOption(option => option.setName("channel").setDescription("The channel to announce the message to").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        const message = interaction.options.getString("message");
        const channel: TextChannel | null = interaction.options.getChannel("channel");
        await channel?.send(message as string);
        await interaction.reply({ content: "Message sent", ephemeral: true });
    }
}