import axios from "axios";

const IDS_URL = process.env.VUE_APP_IDS_SERVER_URL;
const CONNECT_ENDPOINT = "/connect/token";

const authService = {
  login(param) {
    console.log(`${process.env.VUE_APP_IDS_SERVER_URL}${CONNECT_ENDPOINT}`);
    return axios.post(`${IDS_URL}${CONNECT_ENDPOINT}`, param, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  // refreshToken(refreshToken) {
  //   return axios.post(`${IDS_URL}${REFRESH_TOKEN_ENDPOINT}`, {
  //     refresh_token: refreshToken,
  //   });
  // },
  setTokens(accessToken, refreshToken) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },
  getAccessToken() {
    return localStorage.getItem("access_token");
  },
  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  },
  clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
  isAuthenticated() {
    return !!this.getAccessToken();
  },
};

export default authService;
