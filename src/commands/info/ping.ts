import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping command'),
    async execute(interaction: ChatInputCommandInteraction) {
        const reply = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const wsPing = interaction.client.ws.ping;
        await interaction.editReply(`API Latency is ${reply.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket Ping is ${wsPing}ms`);
    }
}