import { LOGIN, LOGOUT } from '../constant'

const initState = {
	name: undefined,
	crmid: undefined,
    imid: undefined,
    token: undefined
}

export default function statusReducer(preState=initState, action) {
	const {type, data} = action
	switch (type) {
		case LOGIN:
			return data
		case LOGOUT:
			return initState
		default:
			return preState
	}
}
