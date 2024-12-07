import axios from 'axios'

export const useAxios = () => {

	const instance = axios.create({
		baseURL:process.env.REACT_APP_SERVER_URL,
		headers:{
			"Content-type":"application/json",
		}
	})

	return instance;
}