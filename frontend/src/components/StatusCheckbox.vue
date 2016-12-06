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
