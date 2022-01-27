import { HOME } from '../constant'

//初始化人的列表
const initState = {
	crmid:'',
    imid:'',
    name:''
}

export default function homeReducer(preState=initState, action) {
	const {type, data} = action
	switch (type) {
		case HOME:
			return data
		default:
			return preState
	}
}
