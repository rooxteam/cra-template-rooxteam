import axios from 'axios';

const AXIOS_TIMEOUT = 1e4; // wait local_template.npmrc second

export default axios.create({
  headers: { 'content-type': 'application/json' },
  timeout: AXIOS_TIMEOUT,
});
