import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/transports';


  function transportUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getMateriamedicas() {
    return http.get(apiEndpoint);
  }
  
  export function getMateriamedica(Id) {
    return http.get(transportUrl(Id));
  }
  
  export function saveMateriamedica(transport) {
    //clone
    const body = { ...transport };
    console.log(body);
   //update
   if (transport.id) {
     //delete _id
     delete body.id;
     return http.put(transportUrl(transport.id),body);
   }
 
   //add a new transport
   return http.post(apiEndpoint, transport);
 }
  
  //delete transports
  export function deleteMateriamedica(Id) {
    return http.delete(transportUrl(Id));
  }  