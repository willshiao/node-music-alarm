import axios from 'axios';

const API_URL = `//${window.location.hostname}:3000/api`;

export default class Api {
  static get API_URL() {
    return API_URL;
  }

  static createAlarm(data) {
    return axios.post(`${API_URL}/alarms`, data)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(true);
      });
  }

  static updateItemById(type, id, newItem) {
    return axios.put(`${API_URL}/${type}/${id}`, newItem)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(true);
      });
  }

  static getMedia() {
    return axios.get(`${API_URL}/media`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(res.data.data);
      });
  }

  static deleteMediaById(id) {
    return axios.delete(`${API_URL}/media/${id}`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(true);
      });
  }

  static deleteAlarmById(id) {
    return axios.delete(`${API_URL}/alarms/${id}`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(true);
      });
  }

  static getAlarms() {
    return axios.get(`${API_URL}/alarms`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(res.data.data);
      });
  }

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

  static guessPlaying(id) {
    return axios.get(`${API_URL}/guess/${id}`)
      .then((res) => {
        if(res.data.status !== 'success') return Promise.reject(res.data.message);
        return Promise.resolve(res.data.data);
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
