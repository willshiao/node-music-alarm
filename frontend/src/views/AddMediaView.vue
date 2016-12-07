<template>
<div class="container">
  <h1>Add Media</h1>
  <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
      <label for="media-name">Name</label>
      <input type="text" id="media-name" class="form-control" aria-describedby="nameHelp" v-model="name">
      <small id="nameHelp" class="form-text text-muted">The name you will see in the quiz.</small>
    </div>
    <div class="form-group">
      <label for="media-filename">File Name</label>
      <input type="text" id="media-filename" class="form-control" aria-describedby="filenameHelp" v-model="filename">
      <small id="filenameHelp" class="form-text text-muted">The name the file will be stored as.</small>
    </div>
    <div class="form-group">
      <label for="media-folder">Folder</label>
      <input type="text" id="media-folder" class="form-control" aria-describedby="folderHelp" v-model="folder">
      <small id="folderHelp" class="form-text text-muted">The folder the file will be stored under.
        Will be created if it does not exist.</small>
    </div>
    <div class="form-group">
      <label for="media-name">Media File</label>
      <input type="file" class="form-control-file" id="media-file" aria-describedby="fileHelp">
      <small id="fileHelp" class="form-text text-muted">The media file you want to upload.</small>
    </div>
    <button class="btn btn-primary" type="submit" v-bind:disabled="submitting">Add</button>
  </form>
</div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import Api from '../lib/api';

export default {
  name: 'AddMediaView',
  data() {
    return {
      name: '',
      folder: '',
      filename: '',
      submitting: false,
    };
  },
  methods: {
    onSubmit() {
      this.submitting = true;
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('folder', this.folder);
      formData.append('filename', this.filename);
      formData.append('mediaFile', document.getElementById('media-file').files[0]);
      axios.post(`${Api.API_URL}/media/upload`, formData)
        .then((res) => {
          this.submitting = false;
          console.log(res.data);
          if(res.data.status === 'success') {
            swal({
              type: 'success',
              title: 'Success',
              text: 'Media item successfully added!',
            });
          } else {
            swal({
              type: 'warning',
              title: 'Fail',
              text: `Media item could not be added because: "${res.data.message}"`,
            });
          }
        })
        .catch((err) => {
          this.submitting = false;
          swal({
            type: 'error',
            title: 'Error',
            text: 'An error occurred.',
          });
          console.error(err.message);
        });
    },
  },
};
</script>