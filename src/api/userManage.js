import axios from 'axios'
axios.defaults.baseURL = 'http://47.100.161.132:8181'
export const getUserList = data => {
  return new Promise((resolve, reject) => {
    axios.get('admin/user/list', { data })
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
export const deleteUser = params => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/del/user/' + params)
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
export const updateUserInfo = (params, data) => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/user/update/' + params, data)
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
export const modifyPass = (params, data) => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/update/user/password/' + params, data)
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
export const verifyUser = (params, data) => {
  return new Promise((resolve, reject) => {
    axios.post('/admin/user/verify/' + params, data)
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
export const addUser = data => {
  return new Promise((resolve, reject) => {
    axios.post('/login/reg', data)
      .then(r => {
        resolve(r.data)
      }).catch(err => {
        reject(err)
      })
  })
}
