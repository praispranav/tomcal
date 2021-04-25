import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/reqforappointments';


  function reqForAppointmentUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getreqForAppointments() {
    return http.get(apiEndpoint);
  }
  
  export function getreqForAppointment(Id) {
    return http.get(appointmentUrl(Id));
  }
  
  export function savereqForAppointment(reqForAppointment) {
    //clone
    const body = { ...reqForAppointment };
    console.log(body);
   //update
   if (reqForAppointment.id) {
     //delete _id
     delete body.id;
     return http.put(reqForAppointmentUrl(reqForAppointment.id),body);
   }
 
   //add a new appointment
   return http.post(apiEndpoint,reqForAppointment);
 }
  
  //delete appointments
  export function deletereqForAppointment(Id) {
    return http.delete(reqForAppointmentUrl(Id));
  }  