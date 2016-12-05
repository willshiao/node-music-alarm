<template>
  <button class="btn" v-on:click="sendRequest" v-bind:class="{disabled: disabled}">Delete</button>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteMediaBtn',
  props: ['id', 'type'],
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    sendRequest() {
      this.disabled = true;
      axios.delete(`//localhost:3000/api/${this.type}/${this.id}`)
        .then((res) => {
          if(res.data.status === 'success') {
            console.log('Deleted successfully');
            this.$emit('deleted', this.id);
          }
        });
    },
  },
};
</script>
