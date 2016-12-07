<template>
  <nav class="navbar navbar-dark bg-primary">
    <router-link class="navbar-brand" to="/home">Music Alarm</router-link>
    <ul class="nav navbar-nav">
      <router-link class="nav-item" tag="li" to="/home" active-class="active">
        <a class="nav-link">Home</a>
      </router-link>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/alarms" id="mediaDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:class="{ active: alarmsActive }">Alarms</a>
        <div class="dropdown-menu pull-left" aria-labelledby="mediaDropdown">
          <router-link class="dropdown-item" to="/alarms/new" active-class="active">Create</router-link>
          <router-link class="dropdown-item" to="/alarms" active-class="active" exact>View</router-link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/media" id="mediaDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-bind:class="{ active: mediaActive }">Media</a>
        <div class="dropdown-menu pull-left" aria-labelledby="mediaDropdown">
          <router-link class="dropdown-item" to="/media/new" active-class="active">Add</router-link>
          <router-link class="dropdown-item" to="/media" active-class="active" exact>View</router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    mediaActive() {
      return this.$route.path.startsWith('/media');
    },
    alarmsActive() {
      return this.$route.path.startsWith('/alarms');
    },
  },
};
</script>