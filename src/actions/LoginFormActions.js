//import axios from 'axios';

export function changeLogin(login){
    return {
        type: "CHANGE_LOGIN",
        payload: login
    };
}

export function changePassword(password){
    return {
        type: "CHANGE_PASSWORD",
        payload: password
    };
};


function requestData() {
	return {type: "REQ_DATA"}
};

function receiveData(json) {
	return{
		type: "RECV_DATA",
		data: json
	}
};

function receiveError(json) {
	return {
		type: "RECV_ERROR",
		data: json
	}
};

//emulates async action and creates fake response from server    
export function verifyData(url, data) {
    if (data.login === "foo" && data.password === "bar"){
        console.log("DENIED!");
        return (dispatch) => {
        dispatch(requestData());
        setTimeout(() => {
            dispatch(receiveData(JSON.parse('{"Auth":"Denied"}')));
        }, 2000);}
    } else if (data.login === "User" && data.password === "Password") {
        console.log("SUCCESS!");
        return (dispatch) => {
        dispatch(requestData());
        setTimeout(() => {
            dispatch(receiveData(JSON.parse('{"Auth":"Logged", "Language":"EN"}')));
        }, 2000);}
    } else {
        return (dispatch) => {
        console.log("ERROR!");
        dispatch(requestData());
        setTimeout(() => {
            dispatch(receiveError());
        }, 2000);}
    }
};

/*
export function verifyData(url, data) {
		//receives json '{"Auth":"Denied"}' or '{"Auth":"Logged", "Language":"EN"}' or error
        return (dispatch) => {
		dispatch(requestData());
		return axios({
			timeout: 20000,
            method: 'post',
            url: url,
            data: data,
            responseType: 'json'
		})
			.then(function(response) {
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
			})
	}
};
*/
