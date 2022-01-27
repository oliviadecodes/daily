/* 
	该文件用于汇总所有的reducer为一个总的reducer
*/
// 引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
// 引入为Count组件服务的reducer
import status from './Status'
import environment from './Environment'
import shiftid from './ShiftID'

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
	status,
	environment,
	shiftid
})
