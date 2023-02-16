const { Client, GatewayIntentBits,PermissionsBitField, Permissions, MessageManager, Collection, IntentsBitField, ChannelType } = require(`discord.js`);
const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    ]}); 


const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');
const help_resourcesID = '1075463278513377291'
const community_commandsID = '1075468572916191282'
const moderation_commandsID = '1075468759030050948'
const chatID = '1075469645286477854'


module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('If you need help , so read this'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('Help Centre')
        .addFields({name: 'This might help you to realise what is this',value: `${client.channels.cache.get(help_resourcesID)}`})
        .addFields({name: 'Commands that can be used by everyone',value: `${client.channels.cache.get(community_commandsID)}`})
        .addFields({name: 'Commands that are for moderators only',value: `${client.channels.cache.get(moderation_commandsID)}`})

        const embed2 = new EmbedBuilder()
        .setTitle('Admins & Developers')
        .addFields(
            {name: `Username:`,value: `qutro`,inline:true},
            {name: `Username:`,value: `markek`,inline:true}
            )
        .setThumbnail('https://www.actitime.com/wp-content/uploads/2022/02/10x-Developer-2.png')
        await interaction.reply({embeds: [embed,embed2]})
    }
    
}





