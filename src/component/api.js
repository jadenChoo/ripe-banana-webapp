import axios from 'axios';
const { REACT_APP_AWS_URL, REACT_APP_AWS_TOKEN } = process.env;

export default axios.create({
    baseURL: REACT_APP_AWS_URL,
    header: {
        'x-api-key': REACT_APP_AWS_TOKEN,
    }
});