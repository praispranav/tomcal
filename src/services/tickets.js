import http from "./httpService";
import { apiUrl } from "./../config/config.json";
const apiEndpoint = apiUrl + "/tickets";

function ticketUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export function getTickets() {
	return http.get(apiEndpoint);
}

export function getTicket(Id) {
	return http.get(ticketUrl(Id));
}

export function saveTicket(ticket) {
	//clone
	const body = { ...ticket };
	console.log("ticket body", body);
	//update
	if (ticket.id) {
		//delete _id
		delete body.id;
		return http.put(ticketUrl(ticket.id), body);
	}

	//add a new ticket
	return http.post(apiEndpoint, ticket);
}

//delete tickets
export function deleteTicket(Id) {
	return http.delete(ticketUrl(Id));
}
