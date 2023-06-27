import axios from "axios";
import { useSelector } from "react-redux";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "MAKE_NEW_CODE" actions
function* createSeshCode(action) {
    // const user = useSelector((store)=>store.user)
	console.log(action.payload)

    const validateCode = (prevArr) => {
		const uniqueCodes = new Set(prevArr.map((obj) => obj.join_code));

		const randomStr = (len, arr) => {
			let ans = "";
			for (let i = len; i > 0; i--) {
				ans += arr[Math.floor(Math.random() * arr.length)];
			}
			return ans;
		};

		let uniqueCode = null;
		while (uniqueCode === null || uniqueCodes.has(uniqueCode)) {
			uniqueCode = randomStr(5, "1234567890abcdefghijklmnopqrstuvwxyz");
		}

		return uniqueCode;
	};

	try {
        const seshCode = yield axios.get(`/api/sesh/`);
		yield console.log('seshcode:',seshCode.data);
		yield console.log('userid inside of try',action.payload);
        const newCode = yield validateCode(seshCode.data)
		console.log(newCode);
        yield axios.post('/api/sesh', {newCode: newCode, user: action.payload})
		yield put({ type: "UPDATE_USER_HOST", payload: {code: newCode, auth: 1, user: action.payload}});

	} catch (error) {
		console.log("Queue get request failed", error);
	}
}

function* seshCodeSaga() {
	yield takeLatest("MAKE_NEW_CODE", createSeshCode);
}

export default seshCodeSaga;
