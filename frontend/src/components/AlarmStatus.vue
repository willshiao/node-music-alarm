<template>
  <div class="jumbotron">
    <h1 class="display-4">{{statusText}}</h1>
    <p class="lead">Last Update: {{lastUpdatedText}}</p>
    <hr class="my-2">
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="" role="button"
        v-bind:class="{ disabled: !currentlyPlaying }">Guess Song</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

const POLLING_INTERVAL = 1000;

export default {
  name: 'AlarmStatus',
  data() {
    return {
      currentlyPlaying: false,
      timeoutId: null,
      lastUpdatedDate: null
    };
  },
  computed: {
    statusText: function() {
      return this.currentlyPlaying ?
        'Playing' :
        'Not Playing';
    },
    lastUpdatedText: function() {
      return (this.lastUpdatedDate === null) ?
        'None' :
        this.lastUpdatedDate.toLocaleTimeString();
    }
  },
  methods: {
    updateStatus: function() {
      axios.get('//localhost:3000/api/playing')
        .then(res => {
          if(res.data.status === 'success') {
            this.currentlyPlaying = res.data.data.playing;
            this.lastUpdatedDate = new Date();
            this.timeoutId = setTimeout(this.updateStatus, POLLING_INTERVAL);
          }
        });
    },
    cancelUpdates: function() {
      if(this.timeoutId !== null) {
        clearTimeout(this.timeoutId);  // Cancel periodic updating
      }
    },
  },
  mounted: function() {
    this.updateStatus();
  },
  destroyed: function() {
    this.cancelUpdates();
  }
};
</script>