export const BASE_URL = 'https://api.mesto2023.students.nomoredomains.monster/';
const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

function requestApi(url, method, body) {
  const headers = {
    "Content-Type": "application/json"
  }
  const config = {
    method,
    headers,
    credentials: 'include'
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

export const getToken = () => {
  return requestApi('users/me', 'GET', undefined)
}

export const signout = () => {
  return requestApi('signout', 'POST', undefined)
 }
