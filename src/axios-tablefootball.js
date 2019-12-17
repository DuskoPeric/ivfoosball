import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ivfootball-fd9bf.firebaseio.com/'
});

export default instance;