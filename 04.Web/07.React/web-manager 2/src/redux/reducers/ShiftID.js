import { CRMIDSHIFTIMID, IMIDSHIFTCRMID } from '../constant'

const initState = {
	crmid:undefined,
	userAbt:undefined,
    imid:undefined
}

export default function shiftIDReducer(preState=initState, action) {
	const {type, data} = action
	switch (type) {
		case CRMIDSHIFTIMID:
			return data
        case IMIDSHIFTCRMID:
            return data
		default:
			return preState
	}
}