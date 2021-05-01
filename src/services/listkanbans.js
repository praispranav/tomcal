import http from "./httpService";
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/listkanbans";

function listkanbanUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getListkanbans() {
	return http.get(apiEndpoint);
}

export function getListkanban(Id) {
	return http.get(listkanbanUrl(Id));
}

export function saveListkanban(listkanban) {
	//clone
	const body = { ...listkanban };
	console.log(body);
	//update
	if (listkanban.id) {
		//delete _id
		delete body.id;
		return http.put(listkanbanUrl(listkanban.id), body);
	}

	//add a new listkanban
	return http.post(apiEndpoint, listkanban);
}

//delete listkanbans
export function deleteListkanban(Id) {
	return http.delete(listkanbanUrl(Id));
}
