import { SELECTENVIRONMENT } from '../constant'

const initState = {
	id:'qa',
	httpUrl:"http://imservice.qa.huohua.cn",
    toolUrl:"http://10.250.0.113:19501"
}

export default function environmentReducer(preState=initState, action) {
	const {type, data} = action
	switch (type) {
		case SELECTENVIRONMENT:
			return data
		default:
			return preState
	}
}
