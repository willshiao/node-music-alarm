<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6 col-lg-4 media-card" v-for="item in displayMedia" :key="item.id">
      <div class="card text-center">
        <div class="card-block">
          <h4 class="card-title">{{item.name}}</h4>
          <a href="#" class="btn btn-primary" v-on:click="chooseMedia(item.id)">Choose</a>
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
import axios from 'axios';

const numMedia = 12;
const API_URL = '//localhost:3000/api';

function randomIndex(max) {
  return Math.floor(Math.random() * (Math.floor(max)));
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
    chooseMedia(id) {
      console.log('Chose: ', id);
      if(this.playing === null) {
        swal({
          title: 'Nothing Playing',
          text: 'No song is playing right now.',
          type: 'warning',
        });
        return;
      }
      if(id !== this.playing.id) {
        swal({
          title: 'Incorrect',
          text: `You guessed incorrectly. The song playing was ${this.playing.name}.
                 Starting another song.`,
          type: 'error',
        });
        this.fillRandom()
          .then(this.changePlaying);
      } else {
        swal({
          title: 'Success',
          text: 'You guessed correctly! Stopping the song...',
          type: 'success',
        });
        this.stopPlaying();
      }
    },
    refreshMedia() {
      return this.getPlaying()
        .then(this.fillRandom);
    },
    getPlaying() {
      return axios.get(`${API_URL}/playing`)
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          if(!res.data.data.playing) {
            this.playing = null;
          } else {
            this.playing = res.data.data.playing;
          }
        });
    },
    stopPlaying() {
      return axios.get(`${API_URL}/stop`);
    },
    changePlaying() {
      return axios.get(`${API_URL}/play/random`)
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          this.playing = res.data.data.playing;
        });
    },
    fillRandom() {
      return axios.get(`${API_URL}/media/random/${numMedia}`)
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          this.media = res.data.data;
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