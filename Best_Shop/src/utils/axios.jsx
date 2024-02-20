import axios from "axios"
import apiHost from "./api"

const requestApi = async (method, url, data) => {
  
    try {
        if (method === "POST") {
            const res = await axios.post(apiHost + url, data)
            return { success: true, data: res.data }
        }
        if (method === "GET") {
            const res = await axios.get(apiHost + url, data)
            return { success: true, data: res.data }
        }
    } catch (error) {
        return { success: false, error: error }
    }

}


export default requestApi