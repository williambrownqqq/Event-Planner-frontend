import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    // console.log(username);
    // console.log(password);
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        // console.log("it is response: " + response)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log(response.data)
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    // console.log(username);
    // console.log(password);
    // console.log(email);
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    console.log("get user")
    console.log(localStorage)
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
