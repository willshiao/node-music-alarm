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
import Api from '../lib/api';

const numMedia = 12;

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
    return Api.getPlaying()
      .then((playing) => {
        this.playing = playing;
        return this.fillRandom();
      });
  },
  methods: {
    chooseMedia(id, evt) {
      evt.preventDefault();
      console.log('Chose: ', id);

      if(this.playing === null) return this.nothingPlayingMsg();
      return Api.guessPlaying(id)
        .then((res) => {
          console.log('Got response: ', res);
          if(res.correct) return this.correctMsg();
          this.incorrectMsg(res.wasPlaying);
          this.playing = res.playing;
          return this.fillRandom();
        })
        .catch((err) => {
          console.error('Error:', err);
          return this.errorMsg({
            title: err,
            text: err,
          });
        });
    },
    fillRandom() {
      return Api.getRandom(numMedia)
        .then((media) => {
          this.media = media;
        });
    },
    nothingPlayingMsg() {
      this.$swal({
        title: 'Nothing Playing',
        text: 'No song is playing right now.',
        type: 'warning',
      });
    },
    errorMsg(msg) {
      this.$swal({
        title: msg.title,
        text: msg.text,
        type: 'error',
      });
    },
    incorrectMsg(playing) {
      this.$swal({
        title: 'Incorrect',
        text: `You guessed incorrectly. The song playing was ${playing.name}.
               Starting another song.`,
        type: 'error',
      });
    },
    correctMsg() {
      this.$swal({
        title: 'Correct',
        text: 'You guessed the song correctly! Stopping the song...',
        type: 'success',
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