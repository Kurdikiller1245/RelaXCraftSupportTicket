/*
  Entry point for tech support queue bot

  License: MIT
  Copyright 2017 BitQuote
 */

// Package imports
const Discord = require('discord.js');
const winston = require('winston');
const requireDir = require('require-dir');

// Module imports
const Database = require('./modules/database.js');
const config = require('./config');

// Event handlers
const events = requireDir('./events');

// Initialize client
const bot = new Discord.Client();
const token = config.token;

// Attempt DB setup
const db = new Database();
db.init()
.then(() => {
  // Log into Discord
  bot.login(NTEyNjI0NTY2ODI5MzE4MTQ1.Ds8K0w.rMEcWVEJB6SvnFN6JEd09MDp2FU);
})
.catch(winston.error);

// Define event handlers
bot.on('ready', () => events.ready(db));
bot.on('message', message => events.message(message, db));
bot.on('messageDelete', message => events.messageDelete(message, db));
bot.on('guildCreate', guild => events.guildCreate(guild, db));
