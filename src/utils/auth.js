import { configAuth } from '../utils/constants'

const {
  BASE_URL,
  headers,
  endpoint } = configAuth;
const {
  ENDPOINT_REGISER,
  ENDPOINT_AUTH,
  ENDPOINT_CHECKJWL } = endpoint;

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    // return Promise.reject(`ПРОИЗОШЛА ОШИБКА: ${res.status} `)
    return Promise.reject(res.status);
  }
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}${ENDPOINT_REGISER}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ password, email })
    }
  )
    .then((response) => {
      return checkError(response);
    })
  // .then((response) => {
  //   // debugger;
  //   try {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //   } catch (error) {
  //     return (error);
  //   }
  // })
  // .then((res) => { return res; })
  // .catch((err) => { console.error(err) })
};

export const authorize = (password, email) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_AUTH}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ password, email })
    })
    .then((response) => {
      return checkError(response);
    })
  // .then((response) => {
  //   try {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //   } catch (response) {
  //     return Promise.reject(`ПРОИЗОШЛА ОШИБКА: ${response.status} `)
  //   }
  // })
  // .catch((err) => { console.error(err); })

};

export const checkToken = (token) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
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





