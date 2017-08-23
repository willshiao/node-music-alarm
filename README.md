node-music-alarm
=================

## Description

A music alarm that plays songs on your Raspberry Pi until the user correctly guesses the song's name.

Requires `omxplayer` to be installed.


## Setup

Perform the following steps on your Raspberrry Pi:

1. Clone the repository
2. Install the dependencies for the frontend and backend portions by running `npm install` in both the `frontend` and `backend` directories.
3. Build the frontend portion by running `npm run build` in the `frontend` directory and serve it from your Raspberry Pi.
4. Start the backend portion on your Raspberry Pi by running `npm start` in the `backend` directory.

You should now be able to connect to the music alarm site.
