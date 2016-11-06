<template>
  <div id="media">
    <v-client-table v-if="loaded" :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MediaTable',
  data() {
    return {
      columns: ['id', 'name', 'path'],
      tableData: [
        {id: 1, name: 'test', path: 'test/path'}
      ],
      loaded: false,
      options: {
        headings: { id: 'ID' }
      }
    };
  },
  mounted: function() {
    axios.get('//localhost:3000/api/media')
      .then(res => {
        const data = res.data;
        if(data.status != 'success') return console.error(data);
        this.tableData = data.data;
        this.loaded = true;
      })
      .catch(console.error);
  }
};
</script>