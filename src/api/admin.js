import axios from '@/libs/api.request'

/**
 * 管理员登录
 * @param data
 * {account: '', password:''}
 * @returns {ClientRequest | ClientHttp2Stream | * | never | AxiosPromise<any>}
 */
export const adminLogin = (data) => {
  return axios.request({
    url: '/admin/login',
    data,
    method: 'post'
  })
}
export const getAdminList = (data) => {
  return axios.request({
    url: '/admin/list',
    params: { data },
    method: 'get'
  })
}
