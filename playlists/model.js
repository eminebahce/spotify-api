const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('../users/model');

const Playlists = sequelize.define('playlists',{
    playlist_name: {
        type: Sequelize.STRING,
        field: 'playlist_name',
        allowNull: false
    }},
    {
       timestamps: false,
       tableName: 'playlists'
    });

Playlists.belongsTo(User);

module.exports = Playlists;