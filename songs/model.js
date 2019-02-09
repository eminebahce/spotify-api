const Sequelize = require('sequelize');
const sequelize = require('../db');
const Playlists = require('../playlists/model');

const Songs = sequelize.define('songs', {
    title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
    },
    artist_name: {
        type: Sequelize.STRING,
        field: 'artist_name',
        allowNull: false
    },
    album_title: {
        type: Sequelize.STRING,
        field: 'album_title',
        allowNull: false
    }},
    {
        timestamps: false,
        tableName: 'songs'
    });

Songs.belongsTo(Playlists);

module.exports = Songs;