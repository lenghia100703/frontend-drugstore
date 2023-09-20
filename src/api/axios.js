import axios from 'axios';

const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token ?? ""
const request = axios.create({
    baseURL: 'http://localhost:8083/api/v1/',
    headers: token !== "" ? { 'Authorization': 'Bearer ' + token } : {}
});

export default request;
