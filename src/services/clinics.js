//import axios from 'axios';
import http from './httpService'; 
import {apiUrl} from './../config/config.json';

const apiEndpoint = apiUrl+'/clinicsolo';

  function userUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getClinics() {
    return http.get(apiEndpoint);
  }
  
  export function getClinic(userId) {
    return http.get(userUrl(userId));
  }
  
  export function saveClinic(user,imageSrc) {
    const formData = new FormData(); 
   //update
   if (user._id) {
     //clone user and delete _id
     const body = { ...user };
     delete body._id;
     for ( let key in body ) {
        formData.append(key, body[key]);
        }
       formData.append('imageSrc', imageSrc);
     return http.put(userUrl(user._id), formData);
   }
   const body = { ...user };
      for ( let key in body ) {
        formData.append(key, body[key]);
        }
       formData.append('imageSrc', imageSrc);
   //add a new user
   return http.post(apiEndpoint, formData);
 }
  
  //delete users
  export function deleteClinic(userId) {
    return http.delete(userUrl(userId));
  }  