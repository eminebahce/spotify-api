const {Router} = require('express');
const Playlists = require('../playlists/model');
const auth = require('../auth/middelware');
const Songs = require('../songs/model');
const Users = require('../users/model');
const router = new Router();

router.get('/playlists', auth, (req, res, next) => {
    Playlists
        .findAll()
        .filter(playlists => playlists.userId === req.user.id)
        .then(playlists => {
            if (!playlists) {
                return res.status(404).send({
                    message: `Playlists doesn't exist`
                })
            } else if (playlists.length === 0) {
                return res.status(204).send({
                    message: 'Playlists not found'
                })
            }
            return res.status(200).send({playlists})
        })
        .catch(error => next(error));
});

router.get('/playlists/:id', auth, (req, res, next) => {
    Playlists
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist doesn't exist`
                })
            }

            Songs
                .findAll()
                .filter(songs => songs.playlistId === playlist.id)
                .then(songs => {
                    if (!songs) {
                        return res.status(404).send({
                            message: `Songs doesn't exist`
                        })
                    }
                    return res.status(200).send({playlist, songs})
                }).catch(error => next(error))


        }).catch(error => next(error));

});

router.post('/playlists', auth, (req, res, next) => {
    Playlists
        .create({
            playlist_name: req.body.name,
            userId: req.user.id
        })
        .then(playlist => {
            if (!playlist) {
                return res.status(204).send({
                    message: `Playlist was not created`
                })
            }
            return res.status(201).send(playlist)
        })
        .catch(error => next(error))
});

router.delete('/playlists/:id', auth, (req, res, next) => {
    Playlists
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist doesn't exist`
                })
            }

            Songs
                .findAll()
                .filter(songs => songs.playlistId === playlist.id)
                .then(songs => {
                    songs.map(song => song.destroy());
                });

            return playlist
                .destroy()
                .then(() => res.status(200).send({
                    message: `Playlist deleted`
                }))
        })
        .catch(error => next(error))
})
;

module.exports = router;