import request from '@/utils/request'

export function stuLogin(data) {
  return request({
    url: '/api/user/login/sloginin',
    method: 'post',
    data
  })
}

export function teaLogin(data) {
  return request({
    url: '/api/user/login/eloginin',
    method: 'post',
    data
  })
}

export function getStuInfo(data) {
  return request({
    url: '/api/user/student/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
