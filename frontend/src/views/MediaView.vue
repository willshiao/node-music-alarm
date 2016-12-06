<template>
<div class="container">
  <h1>Media</h1>
  <media-table></media-table>
  <router-link class="btn btn-primary" to="/media/new">Add Media</router-link>
</div>
</template>

<script>
import { MediaTable } from '../components';

export default {
  name: 'MediaView',
  components: {
    'media-table': MediaTable,
  },
};
</script>