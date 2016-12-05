<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6 col-lg-4 media-card" v-for="item in displayMedia">
      <div class="card text-center">
        <div class="card-block">
          <h4 class="card-title">{{item.name}}</h4>
          <a href="#" class="btn btn-primary" v-on:click="chooseMedia(item.id)">Choose</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

const numMedia = 12;

export default {
  name: 'QuizView',
  data() {
    return {
      media: [],
      playing: null,
      displayMedia: [],
    };
  },
  computed: {
  },
  mounted() {
    this.refreshMedia();
  },
  methods: {
    chooseMedia(id) {
      if(id !== this.playing.id) {
        console.log('Wrong guess.');
      } else {
        console.log('Correct!');
      }
    },
    refreshMedia() {
      return this.fillRandom()
        .then(this.getPlaying);
    },
    getPlaying() {
      return axios.get('//localhost:3000/api/playing')
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          if(!res.data.playing) this.playing = null;
          this.playing = res.data.playing;
        });
    },
    changePlaying() {
      return axios.get('//localhost:3000/api/play/random')
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          this.playing = res.data.data.playing;
        });
    },
    fillRandom() {
      return axios.get(`//localhost:3000/api/media/random/${numMedia - 1}`)
        .then((res) => {
          if(res.data.status !== 'success') throw new Error(res.data.message);
          this.media = res.data.data;
        });
    },
  },
  watch: {
    media() {
      if(this.playing === null) {
        this.displayMedia = this.media;
      } else {
        this.displayMedia = this.media.concat([this.playing]);
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