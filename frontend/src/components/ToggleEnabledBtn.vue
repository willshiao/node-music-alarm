<template>
  <button class="btn" v-on:click="sendRequest">{{btnText}}</button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ToggleEnabledBtn',
  props: ['id', 'type', 'wasEnabled'],
  methods: {
    sendRequest() {
      axios.put(`//localhost:3000/api/${this.type}/${this.id}`, { enabled: !this.isEnabled })
        .then((res) => {
          if(res.data.status === 'success') {
            console.log('Toggled enable status successfully.');
            this.isEnabled = !this.isEnabled;
            this.$emit('toggled', this.id, this.isEnabled);
          }
        });
    },
  },
  data() {
    return {
      isEnabled: this.wasEnabled,
    };
  },
  computed: {
    btnText() {
      return this.isEnabled ? 'Disable' : 'Enable';
    },
  },
};
</script>
