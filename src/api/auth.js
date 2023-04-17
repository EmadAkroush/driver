import request from '@/utils/request'
import {parametrizer} from '@/utils'

export function login(username, password) {
  return request({
    url: `login`,
    method: 'post',
    params: parametrizer({ username, password }),
  })
}

export function logout() {
  return request({
    url: `logout`,
    method: 'get',
  })
}
