<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6 col-lg-4 media-card" v-for="item in displayMedia" :key="item.id">
      <div class="card text-center">
        <div class="card-block">
          <h4 class="card-title">{{item.name}}</h4>
          <a href="#" class="btn btn-primary" v-on:click="chooseMedia(item.id, $event)">Choose</a>
        </div>
      </div>
    </div>
  </div>
  <code>{{displayMedia}}</code>
</div>
</template>

<script>
import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import Api from '../lib/api';

const numMedia = 12;

function randomIndex(max) {
  return Math.floor(Math.random() * (Math.floor(max)));
}

function nothingPlayingMsg() {
  swal({
    title: 'Nothing Playing',
    text: 'No song is playing right now.',
    type: 'warning',
  });
}

function incorrectMsg(playing) {
  swal({
    title: 'Incorrect',
    text: `You guessed incorrectly. The song playing was ${playing.name}.
           Starting another song.`,
    type: 'error',
  });
}

function correctMsg() {
  swal({
    title: 'Correct',
    text: 'You guessed the song correctly! Stopping the song...',
    type: 'success',
  });
}

export default {
  name: 'QuizView',
  data() {
    return {
      media: [],
      playing: null,
      displayMedia: [],
    };
  },
  mounted() {
    this.refreshMedia();
  },
  methods: {
    chooseMedia(id, evt) {
      evt.preventDefault();
      console.log('Chose: ', id);

      if(this.playing === null) return nothingPlayingMsg();
      if(id === this.playing.id) {
        Api.stopPlaying();
        return correctMsg();
      }
      return Api.getPlaying()
        .then((playing) => {
          if(playing === null) {
            this.playing = null;
            return nothingPlayingMsg();
          } else if(id === playing.id) {
            Api.stopPlaying();
            return correctMsg();
          }
          incorrectMsg(playing);
          return this.fillRandom()
            .then(Api.playRandom)
            .then((newPlaying) => {
              this.playing = newPlaying;
            });
        });
    },
    refreshMedia() {
      this.media = [];
      return Api.getPlaying()
        .then((playing) => {
          this.playing = playing;
          return this.fillRandom();
        });
    },
    fillRandom() {
      return Api.getRandom(numMedia)
        .then((media) => {
          this.media = media;
        });
    },
  },
  watch: {
    media() {
      if(!this.playing || this.media.some(item => item.id === this.playing.id)) {
        this.displayMedia = this.media;
      } else {
        console.log(this.playing.name, 'not found within random songs.');
        this.displayMedia = this.media;
        this.displayMedia[randomIndex(this.media.length)] = this.playing;
      }
    },
  },
};
</script>

<style>
.media-card {
  min-height: 180px;
}
</style>