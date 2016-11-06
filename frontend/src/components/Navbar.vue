<template>
  <nav class="navbar navbar-dark bg-primary">
    <router-link class="navbar-brand" to="/home">Music Alarm</router-link>
    <ul class="nav navbar-nav float-xs-right">
      <router-link class="nav-item" tag="li" to="/home" active-class="active">
        <a class="nav-link">Home</a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/alarms" active-class="active">
        <a class="nav-link">Alarms</a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/media" active-class="active">
        <a class="nav-link">Media</a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>