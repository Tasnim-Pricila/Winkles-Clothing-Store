import axios from "axios";

const Api = axios.create({
    baseURL : 'http://localhost:5000/'
})

export default Api;