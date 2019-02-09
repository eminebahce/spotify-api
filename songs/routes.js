const { Router } = require('express');
const auth = require('../auth/middelware');
const Playlists = require('../playlists/model');
const Songs = require('../songs/model');

const router = new Router();

router.post('/playlists/:id/songs', auth, (req, res, next) => {
    Playlists
        .findById(req.params.id)
        .then(playlist => {
            if(!playlist || (playlist.userId !== req.user.id)){
                return res.status(404).send({
                    message: `Playlist doesn't exist`
                })
            }
        })
        .catch(error => next(error));

    Songs
        .create({
            title:req.body.title,
            artist_name: req.body.artist_name,
            album_title: req.body.album_title,
            playlistId: req.params.id
        })
        .then(song => {
            if(!song){
                return res.status(404).send({
                    message: `Song doesn't exist`
                })
            } return res.status(201).send({song})
        })
        .catch(error => next(error))
});

module.exports = router;
