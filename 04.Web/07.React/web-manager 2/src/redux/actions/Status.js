import { LOGIN, LOGOUT } from '../constant'

// 同步action，就是指action的值为Object类型的一般对象
export const doLogin = data => ({type:LOGIN, data:data})
export const doLogout = data => ({type:LOGOUT, data:data})
