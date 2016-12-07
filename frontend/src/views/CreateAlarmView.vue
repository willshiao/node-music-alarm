<template>
<div class="container">
  <h1>Create Alarm</h1>
  <form v-on:submit.prevent="onSubmit" id="alarm-form">
    <div class="form-group">
      <input type="text" id="alarm-name" class="form-control" placeholder="Alarm Name" v-model="name">
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-sm-2">
          <select id="minute" name="minute" class="custom-select" v-model="minute">
            <option value="*">Any minute</option>
            <option v-for="n in 60">{{n - 1}}</option>
          </select>
        </div>
        <div class="col-sm-2">
          <select name="hour" id="hour" class="custom-select" v-model="hour">
            <option value="*">Any hour</option>
            <option v-for="n in 24">{{n - 1}}</option>
          </select>
        </div>
        <div class="col-sm-3">
          <select name="monthDay" class="custom-select" v-model="monthDay">
            <option value="*">Any day of month</option>
            <option v-for="n in 31">{{n}}</option>
          </select>
        </div>
        <div class="col-sm-2">
          <select name="month" class="custom-select" v-model="month">
            <option value="*">Any month</option>
            <option v-for="(mon, i) in months" v-bind:value="i + 1">{{mon}}</option>
          </select>
        </div>
        <div class="col-sm-3">
          <select name="weekDay" class="custom-select" v-model="weekDay">
            <option value="*">Any day of week</option>
            <option v-for="(day, i) in days" v-bind:value="i + 1">{{day}}</option>
          </select>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="submit" v-bind:disabled="submitting">Add Alarm</button>
  </form>
  <code>{{cron}}</code>
</div>
</template>

<script>
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';
import Api from '../lib/api';

export default {
  name: 'CreateAlarmView',
  data() {
    return {
      name: '',
      minute: '*',
      hour: '*',
      monthDay: '*',
      month: '*',
      weekDay: '*',
      days: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      submitting: false,
    };
  },
  computed: {
    cron() {
      return [this.minute, this.hour, this.monthDay, this.month, this.weekDay]
        .join(' ');
    },
  },
  methods: {
    onSubmit() {
      this.submitting = true;
      const data = {
        name: this.name,
        rule: this.cron,
        enabled: true,
      };
      return Api.createAlarm(data)
        .then(() => {
          this.submitting = false;
          swal({
            type: 'success',
            title: 'Success',
            text: 'Alarm successfully added!',
          });
          this.name = '';
        }).catch((err) => {
          this.submitting = false;
          swal({
            type: 'warning',
            title: 'Fail',
            text: `Media item could not be added because: "${err}"`,
          });
        });
    },
  },
};
</script>
