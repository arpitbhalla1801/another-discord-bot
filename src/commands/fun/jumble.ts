import { ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import Jumble from 'jumble-words';
const jumble = new Jumble();
export default {
    data: new SlashCommandBuilder()
    .setName('jumble')
    .setDescription('guess the jumbled word!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const word = jumble.generate();


        const collectorFilter = (i: any) => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
        };

        const modal = new ModalBuilder()
        .setCustomId('jmodal')
        .setTitle('Unjumble the word!')

        const answer = new TextInputBuilder()
        .setCustomId('answer')
        .setLabel(`Unjumble the word - ${word[0].jumble}`)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('You have 60 seconds to guess the word!')

        const first: any = new ActionRowBuilder().addComponents(answer)

        modal.addComponents(first);

        await interaction.showModal(modal);

        interaction.awaitModalSubmit({ time: 60_000, filter: collectorFilter}).then((newInteraction) => {
            const answer = newInteraction.fields.getTextInputValue('answer');
            if(answer.toLowerCase()===word[0].word.toLowerCase()) {
                interaction.followUp(`✅ | That is the correct word!\nThe word was - **${word[0].word}**`)
            } else {
                interaction.followUp(`❌ | That is an incorrect guess!\nThe word was - **${word[0].word}**`)
            }
        })
    }
}