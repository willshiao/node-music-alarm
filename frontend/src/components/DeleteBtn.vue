<template>
  <button class="btn" v-on:click="sendRequest" v-bind:disabled="disabled">Delete</button>
</template>

<script>
import Api from '../lib/api';

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
      let req;
      if(this.type === 'alarm') {
        req = Api.deleteAlarmById(this.id);
      } else {
        req = Api.deleteMediaById(this.id);
      }
      req.then(() => {
        console.log('Deleted successfully');
        this.disabled = false;
        this.$emit('deleted', this.id);
      }).catch(console.error);
    },
  },
};
</script>
