<template>
<div class="container-fluid">
  <div class="row">
      <div class="col-sm-6 col-lg-4 media-card" v-for="item in media">
        <div class="card text-center">
          <div class="card-block">
            <h4 class="card-title">{{item.name}}</h4>
            <a href="#" class="btn btn-primary">Choose</a>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

const numMedia = 12;

export default {
  name: 'QuizView',
  data() {
    return {
      media: [],
    };
  },
  computed: {
  },
  mounted: function() {
    axios.get(`//localhost:3000/api/media/random/${numMedia}`)
      .then(res => {
        if(res.data.status === 'success') {
          this.media = res.data.data;
        }
      });
  }
};
</script>

<style>
.media-card {
  min-height: 180px;
}
</style>