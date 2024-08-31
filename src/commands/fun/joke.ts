import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';


export default {
    data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('random silly joke.'),
    async execute(interaction: ChatInputCommandInteraction) {
        await fetch('https://apis.duncte123.me/joke').then((res) => res.json()).then( async result => {
            const embed = new EmbedBuilder()
            .setDescription(`**${result.data.title} \n ${result.data.body}**`)
            .setTitle(`${result.data.url}`)
            .setColor('Random')
            .setTimestamp()
            await interaction.reply({
                embeds: [embed]
            })
        })
        
        
    
    }
}