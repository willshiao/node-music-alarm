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
            return h('status-checkbox', {
              props: {
                id: row.id,
                type: 'alarms',
                wasEnabled: row.enabled,
              },
              on: { toggled: el.toggleEnabled },
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
    this.fetchData();
  },
  methods: {
    fetchData() {
      return Api.getAlarms()
        .then((media) => {
          this.tableData = media;
          this.loaded = true;
        })
        .catch(console.error);
    },
    clearRow(id) {
      this.tableData = this.tableData.filter(row => row.id !== id);
    },
    toggleEnabled(id, isEnabled) {
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