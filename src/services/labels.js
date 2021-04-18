import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/labels';


  function labelUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getLabels() {
    return http.get(apiEndpoint);
  }
  
  export function getLabel(Id) {
    return http.get(labelUrl(Id));
  }
  
  export function saveLabel(label) {
    //clone
    const body = { ...label };
    console.log(body);
   //update
   if (label.id) {
     //delete _id
     delete body.id;
     return http.put(labelUrl(label.id),body);
   }
 
   //add a new label
   return http.post(apiEndpoint, label);
 }
  
  //delete labels
  export function deleteLabel(Id) {
    return http.delete(labelUrl(Id));
  }  