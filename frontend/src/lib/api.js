import axios from 'axios';

const API_URL = `//${window.location.hostname}:3000/api`;

export default class Api {
  static getPlaying() {
    return axios.get(`${API_URL}/playing`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        if(!res.data.data.playing) {
          return Promise.resolve(null);
        }
        return Promise.resolve(res.data.data.playing);
      });
  }

  static stopPlaying() {
    return axios.get(`${API_URL}/stop`);
  }

  static playRandom() {
    return axios.get(`${API_URL}/play/random`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(res.data.data.playing);
      });
  }

  static getRandom(number = 1) {
    return axios.get(`${API_URL}/media/random/${number}`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(res.data.data);
      });
  }
}
