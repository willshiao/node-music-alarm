<template>
  <div class="container">
  <alarm-status></alarm-status>
  </div>
</template>

<script>
import {AlarmStatus} from '../components';

export default {
  name: 'HomeView',
  components: {
    'alarm-status': AlarmStatus
  }
};
</script>