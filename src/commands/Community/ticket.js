const { Client,Events, GatewayIntentBits,PermissionsBitField, Permissions, MessageManager, Collection, IntentsBitField, Guild, ChannelType,PermissionOverwrites, StringSelectMenuBuilder } = require(`discord.js`);
const client = new Client({ 
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    ]}); 

const permissions = new PermissionsBitField([
    PermissionsBitField.Flags.ViewChannel
])

const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('@discordjs/builders');
const { ButtonStyle } = require('discord.js');
const guild = client.guilds.cache.get('1075376385922707556')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('if you want to create a ticket'),
    async execute(interaction, client) {
        const embed_ticket = new EmbedBuilder()
        .setTitle('Create a ticket')
        .addFields(
            { name: '🔧 BOT', value: 'A purchase request for a Discord Bot'},
            { name: '📦 SCRIPT', value: 'A purchase request for a Script'},
            { name: '🎨 DESIGN', value: 'A purchase request for a Design'},
            { name: '⚙️ FRONTEND', value: 'A purchase request for a Frontend'},
            { name: '⚒️ BACKEND', value: 'A purchase request for a Backend'},
            { name: '📷 VIDEO', value: 'A purchase request for a Video'},
            { name: '💬 SUPPORT', value: 'Ask for a help'},
        )
        .setImage('https://raw.githubusercontent.com/is-a-dev/register/main/media/banner.png')
        .setFooter({ text: 'By creating ticket you automatically agree with our rules!', iconURL: 'https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png' })

        const row2 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Choose your order')
            .addOptions(
                {
                    label: '🔧 BOT',
                    description: 'You wish you had a cool discord bot for you and your friends?Purchase it right now!',
                    value: 'bot',
                },
                {
                    label: '📦 SCRIPT',
                    description: 'The best start of your project!Backend + Frontend + Design',
                    value: 'script',
                },
                {
                    label: '🎨 DESIGN',
                    description: 'You do not have any design?Purchase it right now!',
                    value: 'design',
                },
                {
                    label: '⚙️ FRONTEND',
                    description: 'Our developers make a frontend for your website!',
                    value: 'front',
                },
                {
                    label: '⚒️ BACKEND',
                    description: 'Our developers make a backend for your website!',
                    value: 'back',
                },
                {
                    label: '📷 VIDEO',
                    description: 'If you want to have a good video, call us!',
                    value: 'video',
                },
                {
                    label: '💬 SUPPORT',
                    description: 'If you have any questions, ask our supports for a help!',
                    value: 'support'
                }
            )
        )
        await interaction.reply({components: [row2], embeds: [embed_ticket] });

        const filter = i => i.customId === 'create';
        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {
            const channel = await interaction.guild.channels.create({
                name: `Ticket - ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: '1075387458415509544'
            })
            const buttonHand = require('../../../src/index')
            const buttonEquals = buttonHand.aboba;
            await channel.send({content: `<@${i.user.id}>,you created a ticket to create - ${buttonEquals}!`})
            await channel.permissionOverwrites.create(i.user.id, {ViewChannel: true})
            await channel.permissionOverwrites.create(channel.guild.roles.everyone, {ViewChannel:false})

        })
        
    }
}