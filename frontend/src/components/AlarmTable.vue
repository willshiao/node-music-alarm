<template>
  <div id="alarms">
    <v-client-table v-if="loaded" :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import Api from '../lib/api';

export default {
  name: 'AlarmTable',
  data() {
    const el = this;
    return {
      columns: ['id', 'name', 'rule', 'toggleEnabled', 'delete'],
      tableData: [],
      loaded: false,
      options: {
        headings: {
          id: 'ID',
          toggleEnabled: 'Enabled',
        },
        templates: {
          delete(h, row) {
            return h('delete-btn', {
              props: {
                id: row.id,
                type: 'alarms',
              },
              on: { deleted: el.clearRow },
            });
          },
          toggleEnabled(h, row) {
            console.log('Row:', row);
            const toReturn = new h('status-checkbox', {
              props: {
                id: row.id,
                type: 'alarms',
                wasEnabled: row.enabled,
                // isEnabled: row.enabled,
              },
              on: { toggled: el.toggleEnabled },
            });
            // toReturn.created();
            console.log('Return: ', toReturn);
            return toReturn;
          },
        },
        pagination: {
          chunk: 10,
        },
        perPage: 100,
        perPageValues: [10, 25, 100, 1000, 10000],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      return Api.getAlarms()
        .then((alarms) => {
          this.tableData = alarms;
          this.loaded = true;
        })
        .catch(console.error);
    },
    clearRow(id) {
      this.tableData = this.tableData.filter(row => row.id !== id);
    },
    toggleEnabled(id, isEnabled) {
      console.log('Toggling enabled status for row', id);
      this.tableData.forEach((row) => {
        if(row.id !== id) return;
        row.enabled = isEnabled;
      });
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