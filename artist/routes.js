const {Router} = require('express');
const auth = require('../auth/middelware');
const Songs = require('../songs/model');
const Playlists = require('../playlists/model');
const _ = require('lodash');

const router = new Router();

router.get('/artists', auth, (req, res, next) => {
    Songs
        .findAll()
        .then(artists => {
            if (!artists) {
                return res.status(404).send({
                    message: `No artist found`
                })
            }

            const artist =_.groupBy(artists, function(artists) {
                return artists.artist_name;
            });

            return res.status(200).send(artist);

        })
        .catch(error => next(error));

});

router.put('/playlists/:id/songs/:songid', auth, (req, res, next) => {
    Playlists
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist doesn't exist`
                })
            }
        }).catch(error => next(error));

    Songs
        .findById(req.params.songid)
        .then(song => {
            if (!song || song.playlistId != req.params.id) {
                return res.status(404).send({
                    message: `Song doesn't exist`
                })
            }
            return song.update(req.body).then(song => res.status(200).send(song));
        }).catch(error => next(error))

});

router.delete('/playlists/:id/songs/:songid', auth, (req, res, next) => {
    Playlists
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist doesn't exist`
                })
            }
        }).catch(error => next(error));

    Songs
        .findById(req.params.songid)
        .then(song => {
            if (!song || song.playlistId != req.params.id) {
                return res.status(404).send({
                    message: `Song doesn't exist`
                })
            }
            return song.destroy().then(() => res.status(200).send({
                message: 'Song was deleted'
            }))
        }).catch(error => next(error))
});

module.exports = router;



