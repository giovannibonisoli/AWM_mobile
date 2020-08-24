import AuthService from '../services/auth.service';

const BASE_URL = "http://10.0.2.2:8000/api"

export const request = async (url: string, method:string, body: Object) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	};

	if (AuthService.isLoggedIn()){
		await AuthService.checkToken();
		const user = await AuthService.getCurrentUser();
		headers.Authorization = `Bearer ${user.token.access}`;
	}

	return fetch(`${BASE_URL}/${url}`, {
		method: method,
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.then(data => {return data})
	.catch(err => console.error(err));
};
