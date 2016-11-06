<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { Navbar } from './components';

export default {
  name: 'app',
  components: {
    navbar: Navbar
  }
};
</script>

<style>

</style>
