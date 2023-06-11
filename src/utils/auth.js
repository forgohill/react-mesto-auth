export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    }
  )
    .then((response) => {
      // debugger;
      try {
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        return (error);
      }
    })
    .then((res) => { return res; })
    .catch((err) => { console.error(err) })
};

export const authorize = (password, email) => {
  return fetch(
    `${BASE_URL}/signin`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    })
    .then((response) => {
      try {
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        return (error);
      }
    })
    // .then((res) => { console.log(res) })
    .catch((err) => { console.error(err); })

};

export const checkToken = (token) => {
  return fetch(
    `${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

    })
    .then((response) => {
      try {
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        return (error);
      }
    }
    )
    .catch((err) => { console.error(err); })
};





