/* 
	该文件专门为Home组件生成action对象
*/
import { HOME } from '../constant'

// 同步action，就是指action的值为Object类型的一般对象
export const home = data => ({type:HOME, data:data})
