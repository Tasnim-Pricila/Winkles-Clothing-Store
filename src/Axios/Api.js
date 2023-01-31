import axios from "axios";

const Api = axios.create({
    baseURL : 'https://winkles-server.onrender.com/'
})

export default Api;