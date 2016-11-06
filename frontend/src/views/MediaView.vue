<template>
<div class="container">
  <h1>Media</h1>
  <media-table></media-table>
</div>
</template>

<script>
import {MediaTable} from '../components';

export default {
  name: 'MediaView',
  components: {
    'media-table': MediaTable
  }
};
</script>