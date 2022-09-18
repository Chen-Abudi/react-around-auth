// const BASE_URL = "https://register.nomoreparties.co";

// function processResponse(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     return Promise.reject(`An error just occurred: ${res.status}`);
//   }
// }

// export const register = (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   }).then((res) => {
//     if (res.status === 201) {
//       return res.json();
//     }
//     if (res.status === 400) {
//       throw new Error(
//         "One of the fields was filled in incorrectly or a user with this email existing already"
//       );
//     }
//   });
//   // .catch((err) => console.error(err));
// };

// export const login = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   }).then((res) => {
//     if (res.status === 200) {
//       return res.json();
//     }
//     if (res.status === 400) {
//       throw new Error("One or more of the fields were not provided");
//     }
//     if (res.status === 401) {
//       throw new Error("The user with the specified email not found");
//     }
//   });
//   // .then((res) => {
//   //   localStorage.setItem("token", res.token);
//   //   return res;
//   // });
//   // .catch((err) => console.error(err));
// };

// export const checkToken = (token) => {
//   // const token = localStorage.getItem("token");
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => {
//     if (res.status === 200 || res.status === 201) {
//       return res.json();
//     }
//     if (res.status === 400) {
//       throw new Error("Token not provided or provided in the wrong format");
//     }
//     if (res.status === 401) {
//       throw new Error("The provided token is invalid");
//     }
//   });
//   // .catch((err) => console.error(err));
// };

class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  processResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`An error just occurred: ${res.status}`);
    }
  }

  register(credentials) {
    return fetch(`${this.baseUrlbaseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(credentials),
    })
      .then(this.processResponse)
      .then((data) => {
        return fetch(`${this.baseUrl}/signin`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(credentials),
        })
          .then(this.processResponse)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            return data;
            // There is no need to run checkToken because data has already returned from registration
          });
      });
  }

  login(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this.processResponse)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return this.checkToken(data.token);
      });
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processResponse);
  }
}

export const auth = new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
