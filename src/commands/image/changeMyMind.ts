import { Canvacord } from "canvacord";
import { AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('changemymind')
    .setDescription('change my mind meme from text')
    .addStringOption((option) => (
        option.setName('text')
        .setDescription('the meme text')
        .setRequired(true)
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        
        const text = interaction.options.getString('text');

        const image = await Canvacord.changemymind(text);
        // console.log(image);
        const attachment = new AttachmentBuilder(image, {name:'cmm.png'})

        await interaction.editReply({
            files: [attachment]
        });
    }
}