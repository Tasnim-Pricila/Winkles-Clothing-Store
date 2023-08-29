import axios from "axios";

const Api = axios.create({
    baseURL : 'https://winkles-server-side.vercel.app/'
})

export default Api;