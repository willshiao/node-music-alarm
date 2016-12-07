<template>
<div class="container">
  <h1>Alarms</h1>
  <alarm-table></alarm-table>
  <router-link class="btn btn-primary" to="/alarms/new">Add Alarm</router-link>
</div>
</template>

<script>
import { AlarmTable } from '../components';

export default {
  name: 'AlarmsView',
  components: {
    'alarm-table': AlarmTable,
  },
};
</script>