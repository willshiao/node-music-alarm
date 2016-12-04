<template>
  <div id="alarms">
    <v-client-table v-if="loaded" :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlarmTable',
  data() {
    const el = this;
    return {
      columns: ['id', 'name', 'rule', 'enabled', 'delete'],
      tableData: [],
      loaded: false,
      options: {
        headings: { id: 'ID' },
        templates: {
          delete(h, row) {
            return h('delete-btn', {
              props: {
                id: row.id,
                type: 'alarms',
              },
              on: {
                deleted: el.clearRow,
              },
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
    axios.get('//localhost:3000/api/alarms')
      .then((res) => {
        const data = res.data;
        if(data.status !== 'success') throw new Error(data);
        this.tableData = data.data;
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