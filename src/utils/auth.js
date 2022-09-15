const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.status === 201) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error(
        "One of the fields was filled in incorrectly or a user with this email existing already"
      );
    }
  });
  // .catch((err) => console.error(err));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 400) {
        throw new Error("One or more of the fields were not provided");
      }
      if (res.status === 401) {
        throw new Error("The user with the specified email not found");
      }
    })
    .then((res) => {
      localStorage.setItem("token", res.token);
      return res;
    });
  // .catch((err) => console.error(err));
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 200 || res.status === 201) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("Token not provided or provided in the wrong format");
    }
    if (res.status === 401) {
      throw new Error("The provided token is invalid");
    }
  });
  // .catch((err) => console.error(err));
};
