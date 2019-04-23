import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply token to every request
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //delete auth header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;