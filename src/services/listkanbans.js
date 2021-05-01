import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/listkanbans';


  function listKanbanUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getListKanbans() {
    return http.get(apiEndpoint);
  }
  
  export function getListKanban(Id) {
    return http.get(listKanbanUrl(Id));
  }
  
  export function saveListKanban(listKanban) {
    //clone
    const body = { ...listKanban };
    console.log(body);
   //update
   if (listKanban.id) {
     //delete _id
     delete body.id;
     return http.put(listKanbanUrl(listKanban.id),body);
   }
 
   //add a new listkanban
   return http.post(apiEndpoint, listKanban);
 }
  
  //delete listkanbans
  export function deleteListKanban(Id) {
    return http.delete(listKanbanUrl(Id));
  }  