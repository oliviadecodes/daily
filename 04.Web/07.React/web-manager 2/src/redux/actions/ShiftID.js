import { CRMIDSHIFTIMID, IMIDSHIFTCRMID } from '../constant'

// 同步action，就是指action的值为Object类型的一般对象
export const crmidShiftImid = data => ({type:CRMIDSHIFTIMID, data:data})
export const imidShiftCrmid = data => ({type:IMIDSHIFTCRMID, data:data})