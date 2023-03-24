export const BASE_URL = 'https://auth.nomoreparties.co/';
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

function requestApi(url, method, body, token) {
  const headers = {
    "Content-Type": "application/json"
  }
  if (token !== undefined) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const config = {
    method,
    headers,
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  return fetch(`${BASE_URL}${url}`, config).then(checkResponse)
}

export const register = (userInfo) => {
  return requestApi('signup', 'POST', userInfo)
}

export const login = (userInfo) => {
  return requestApi('signin', 'POST', userInfo)
}

export const getToken = (token) => {
  return requestApi('users/me', 'GET', undefined, token)
}
