import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/appointments';


  function appointmentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getAppointments() {
    return http.get(apiEndpoint);
  }
  
  export function getAppointment(Id) {
    return http.get(appointmentUrl(Id));
  }
  
  export function saveAppointment(appointment) {
    //clone
    const body = { ...appointment };
    console.log(body);
   //update
   if (appointment.id) {
     //delete _id
     delete body._id;
     return http.put(appointmentUrl(appointment.id),body);
   }
 
   //add a new appointment
   return http.post(apiEndpoint, appointment);
 }
  
  //delete appointments
  export function deleteAppointment(Id) {
    return http.delete(appointmentUrl(Id));
  }  