/*
	@param endpoint:string -> 'food/list/'

*/
export function request({endpoint, params, method, data, headers, token}){
	// make a request to the api
	let url = 'http://localhost:8000/api/' + endpoint
	let result
	if (params){
		url = url + '?' + params
	}
	if (!headers){
		headers = {
			"Authorization": "Token " + token,
			"Content-Type": 'application/json'
		}
	}else{
		if(headers['Content-Type'] === 'application/json'){
			data =JSON.stringify(data)
		}
	}

	if (method == 'post' || method == 'POST'){
		// post request
		result = make_post_request({url:url, data:data, headers:headers})
	}
	else{
		// get request
		result = make_get_request({url:url, params:params})
	}
	return result
}



export function make_get_request({url, params, token}){
	let result;
	fetch(url, {
		// "Authorization": 'Token ' + token
	})
	.then(res => res.json())
	.then(data => {
		result = data
	})
	.catch(err => {
		console.log("Error getting resource", err.stack)
	})
	return result
}


export function make_post_request({url, data, headers}){
	let result;
	fetch(url, {
		method: 'post',
		headers: headers,
		body: data
	})
	.then(res => res.json())
	.then(data => {
		result = data
	})
	.catch(err => {
		console.log("Error getting resource", err.stack)
	})
	return result
}


export default { request, make_post_request, make_get_request}