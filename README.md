node-music-alarm
=================

## Description

A music alarm that plays songs on your Raspberry Pi until the user correctly guesses the song's name.

Requires `omxplayer` to be installed.


## Setup

Install the dependencies for the frontend and backend portions by running `npm install` in the `frontend` and `backend` directories.

First, build the frontend portion by running `npm run build` in the `frontend` directory and serve it from your Raspberry Pi.

Next, start the backend portion on your Raspberry Pi by running `npm start` in the `backend` directory.

You should now be able to connect to the music alarm site.
