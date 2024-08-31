import { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
    data: new SlashCommandBuilder()
    .setName('reverse')
    .setDescription('Reverses the given text')
    .addStringOption((option) => (
        option.setName('text')
        .setDescription('text to reverse...')
        .setRequired(true)
    )),
    async execute(interaction: ChatInputCommandInteraction) {
        function reverseText(text: any): string {
            const splitString: string[] = text?.split("");
			const reverseArray: string[] = splitString.reverse();
			const joinArray: string = reverseArray.join("");
            return joinArray;
        }

        let embed = new EmbedBuilder()
        .setDescription(`**original text**\n${interaction.options.getString('text')}\n\n**reversed text**\n${reverseText(interaction.options.getString('text'))}`)
        .setColor('Random')
        .setTimestamp()


        await interaction.reply({
            embeds: [embed]
        })
    }
}