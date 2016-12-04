<template>
<div class="container">
  <h1>Alarms</h1>
  <alarm-table></alarm-table>
</div>
</template>

<script>
import {AlarmTable} from '../components';

export default {
  name: 'AlarmsView',
  components: {
    'alarm-table': AlarmTable
  }
};
</script>