<template>
  <div id="media">
    <v-client-table v-if="loaded" :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import Api from '../lib/api';

export default {
  name: 'MediaTable',
  data() {
    const el = this;
    return {
      columns: ['id', 'name', 'path', 'delete'],
      tableData: [],
      loaded: false,
      options: {
        headings: { id: 'ID' },
        templates: {
          delete(h, row) {
            return h('delete-btn', {
              props: {
                id: row.id,
                type: 'media',
              },
              on: { deleted: el.clearRow },
            });
          },
        },
        pagination: {
          dropdown: true,
        },
      },
    };
  },
  mounted() {
    return Api.getMedia()
      .then((media) => {
        this.tableData = media;
        this.loaded = true;
      })
      .catch(console.error);
  },
  methods: {
    clearRow(id) {
      this.tableData = this.tableData.filter(row => row.id !== id);
    },
  },
};
</script>

<style>
  div.VueTables__limit, div.VueTables__dropdown-pagination {
    float: right;
    margin-right: 15px;
  }
  div.VueTables__search>label,
  div.VueTables__limit>label,
  div.VueTables__dropdown-pagination>label {
    padding-right: 10px;
  }
</style>