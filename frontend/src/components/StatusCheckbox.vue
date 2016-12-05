<template>
  <input type="checkbox" v-model="isEnabled" v-bind:disabled="boxDisabled">
</template>

<script>
import axios from 'axios';

export default {
  name: 'StatusCheckbox',
  props: ['id', 'type', 'wasEnabled'],
  methods: {
    sendRequest() {
      this.boxDisabled = true;
      const originalStatus = !this.isEnabled;  // Status before the change

      axios.put(`//localhost:3000/api/${this.type}/${this.id}`, { enabled: this.isEnabled })
        .then((res) => {
          if(res.data.status === 'success') {
            this.boxDisabled = false;
            this.$emit('toggled', this.id, this.isEnabled);
          }
        })
        .catch(() => {
          this.boxDisabled = false;
          this.isEnabled = originalStatus;
        });
    },
  },
  data() {
    return {
      isEnabled: this.wasEnabled,
      boxDisabled: false,
    };
  },
  watch: {
    isEnabled() {
      this.sendRequest();
    },
  },
};
</script>
