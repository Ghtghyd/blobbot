const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify your Active Developer Badge')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
    console.log(`Logged in as ${client.user.tag}!`);
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'verify') {
    await interaction.reply({
      content: 'Thanks for using the verification command! Your interaction has been recorded. Wait 24 hours and then visit https://discord.com/developers/active-developer to claim your badge!',
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN); 