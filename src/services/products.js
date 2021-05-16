import http from './httpService'; 
import {apiUrl} from './../config/config.json';
const apiEndpoint = apiUrl+'/products';


  function productUrl(id) {
    return `${apiEndpoint}/${id}`;
  }
  
  export function getProducts() {
    return http.get(apiEndpoint);
  }
  
  export function getProduct(Id) {
    return http.get(productUrl(Id));
  }
  
  export function saveProduct(product) {
    //clone
    const body = { ...product };
    console.log(body);
   //update
   if (product.id) {
     //delete _id
     delete body.id;
     return http.put(productUrl(product.id),body);
   }
 
   //add a new product
   return http.post(apiEndpoint, product);
 }
  
  //delete products
  export function deleteProduct(Id) {
    return http.delete(productUrl(Id));
  }  