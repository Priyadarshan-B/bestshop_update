import axios from "axios";
import apiHost from "./api";
import Cookies from "js-cookie";

const requestApi = async (method, url, data) => {
  try {
    const token = Cookies.get("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let response;
    if (method === "POST") {
      response = await axios.post(apiHost + url, data, { headers });
    } else if (method === "GET") {
      response = await axios.get(apiHost + url, { headers });
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export default requestApi;
