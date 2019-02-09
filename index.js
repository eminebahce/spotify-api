const express = require('express');
const bodyParser = require('body-parser');
const playlistsRouter = require('./playlists/routes');
const songsRouter = require('./songs/routes');
const authRouter = require('./auth/routes');
const userRouter = require('./users/routes');
const artistRouter = require('./artist/routes');

const app = express();
const port = process.env.PORT || 4000;

app
    .use(bodyParser.json())
    .use(authRouter)
    .use(playlistsRouter)
    .use(userRouter)
    .use(songsRouter)
    .use(artistRouter)
    .listen(port, () => console.log(`Listening on port ${port}`));