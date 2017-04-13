<template>
  <input type="checkbox" v-model="isEnabled" v-bind:disabled="boxDisabled">
</template>

<script>
import Api from '../lib/api';

export default {
  name: 'StatusCheckbox',
  props: ['id', 'type', 'wasEnabled'],
  methods: {
    sendRequest() {
      this.boxDisabled = true;
      const originalStatus = !this.isEnabled;  // Status before the change

      Api.updateItemById(this.type, this.id, { enabled: this.isEnabled })
        .then(() => {
          this.boxDisabled = false;
          this.$emit('toggled', this.id, this.isEnabled);
        })
        .catch(() => {
          this.boxDisabled = false;
          this.isEnabled = originalStatus;
        });
    },
  },
  data() {
    console.log(`Data: ${this.id}: ${this.wasEnabled}`);
    return {
      isEnabled: this.wasEnabled,
      boxDisabled: false,
    };
  },
  // mounted() {
    // console.log(`Mounted: ${this.id}`);
    // this.isEnabled = this.wasEnabled;
  // },
  created() {
    console.log('Created ');
  },
  watch: {
    isEnabled() {
      console.log('Request sent');
      this.sendRequest();
    },
  },
};
</script>
