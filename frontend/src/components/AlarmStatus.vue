<template>
  <div class="jumbotron">
    <h1 class="display-4">{{statusText}}</h1>
    <p class="lead">Last Update: {{lastUpdatedText}}</p>
    <hr class="my-2">
    <p class="lead">
      <router-link class="btn btn-primary btn-lg" to="/quiz" role="button"
        v-bind:class="{ disabled: !currentlyPlaying }">Guess Song</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

const POLLING_INTERVAL = 1000;
const API_URL = '//localhost:3000/api';

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
      axios.get(`${API_URL}/playing`)
        .then((res) => {
          if(res.data.status === 'success') {
            this.currentlyPlaying = res.data.data.playing;
            this.lastUpdatedDate = new Date();
            this.timeoutId = setTimeout(this.updateStatus, POLLING_INTERVAL);
          }
        });
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