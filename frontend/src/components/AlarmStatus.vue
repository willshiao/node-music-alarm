<template>
  <div class="jumbotron">
    <h1 class="display-4">{{statusText}}</h1>
    <p class="lead">Last Update: {{lastUpdatedText}}</p>
    <hr class="my-2">
    <p class="lead">
      <router-link class="btn btn-primary btn-lg" to="/quiz" role="button"
        v-bind:class="{ disabled: !currentlyPlaying }">Guess Song</router-link>

      <a class="btn btn-primary btn-lg" role="button" href="#"
        v-bind:class="{ disabled: currentlyPlaying }" 
        v-on:click="playRandom($event)">Play Song</a>
    </p>
  </div>
</template>

<script>
import Api from '../lib/api';

const POLLING_INTERVAL = 1000;

export default {
  name: 'AlarmStatus',
  data() {
    return {
      currentlyPlaying: false,
      timeoutId: null,
      lastUpdatedDate: null,
    };
  },
  computed: {
    statusText() {
      return this.currentlyPlaying ?
        'Playing' :
        'Not Playing';
    },
    lastUpdatedText() {
      return (this.lastUpdatedDate === null) ?
        'None' :
        this.lastUpdatedDate.toLocaleTimeString();
    },
  },
  methods: {
    updateStatus() {
      return Api.getPlaying()
        .then((playing) => {
          this.currentlyPlaying = (playing !== null);
          this.lastUpdatedDate = new Date();
          this.timeoutId = setTimeout(this.updateStatus, POLLING_INTERVAL);
        });
    },
    playRandom(evt) {
      evt.preventDefault();
      return Api.playRandom();
    },
    cancelUpdates() {
      if(this.timeoutId !== null) {
        clearTimeout(this.timeoutId);  // Cancel periodic updating
      }
    },
  },
  mounted() {
    this.updateStatus();
  },
  destory() {
    this.cancelUpdates();
  },
};
</script>