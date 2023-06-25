import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "MAKE_NEW_CODE" actions
function* createSeshCode() {

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
        const seshCode = yield axios.get("/api/sesh");
        const newCode = yield validateCode(seshCode.data)
        yield axios.post('/api/sesh', newCode)

		yield put({ type: "SET_QUEUE", payload: seshQueue.data });
	} catch (error) {
		console.log("Queue get request failed", error);
	}
}

function* seshCodeSaga() {
	yield takeLatest("MAKE_NEW_CODE", createSeshCode);
}

export default seshCodeSaga;
