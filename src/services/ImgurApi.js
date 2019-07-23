import axios from "axios";

const clientID = "Client-ID 2547e24f9344b8c";

export default baseURL => {
  return axios.create({
    baseURL: baseURL,
    timeout: 0,
    headers: {
      Authorization: clientID
    }
  });
};
