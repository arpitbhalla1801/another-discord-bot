import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Weather from "@tinoschroeter/weather-js";

const weather = new Weather();

export default {
    data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get the weather for a city")
    .addStringOption(option => option.setName("city").setDescription("The city to get the weather for").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const city = interaction.options.getString("city");


        let embed = new EmbedBuilder()
        .setColor("Blue")
        await weather.find({
            search: city,
            degreeType: "C"
        }).then((data: any) => {
            embed.setTitle(`Weather for ${data[0].location.name}`)
            .setThumbnail(data[0].current.imageUrl)
            .setDescription(`Current weather: **${data[0].current.skytext}**. Current temperature: **${data[0].current.temperature}°C**.\nFeels like: **${data[0].current.feelslike}°C**. Humidity: **${data[0].current.humidity}%**.
                Windspeed: **${data[0].current.windspeed}**.
                `)
            .setTimestamp()
        }).catch((error: any) => {
            console.log(error);
        });

        await interaction.editReply({ embeds: [embed] });

    }
}