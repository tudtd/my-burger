import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://td-demo-c8e9b.firebaseio.com/'
});

export default instance;
