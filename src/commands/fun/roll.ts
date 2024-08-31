import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('roll a dice!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await fetch('https://www.randomnumberapi.com/api/v1.0/random?min=1&max=7&count=1')
        .then(res => res.json())
        .then(async body => {
            const diceRoll = body[0];
            await interaction.reply(`You rolled a **${diceRoll}**!`);
        })
        
    }
}