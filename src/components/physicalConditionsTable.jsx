import React,{Component} from "react";
import Table from './../common/table';


const x= <h1></h1>;
class UsersTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
    {label: 'Username',   path: 'login' } ,
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
    {label: 'SessionNo',   path: 'sessionNoe' } ,   	  
    {label: 'date',   path: 'date' } ,   	  
    {label: 'Time',   path: 'Time' } ,   	  
    {label: 'age',   path: 'age' } ,   	  
    {label: 'ethnicity',   path: 'ethnicity' } ,   
    {label: 'DOB',   path: 'dayBirth' } ,   
    {label: 'cityOfBirth',   path: 'cityOfBirth' } ,           
    {label: 'weight',   path: 'weight' } ,   	  
    {label: 'weightUnit',   path: 'weightUnit' } ,   	      
    {label: 'height',   path: 'height' } ,   	          
    {label: 'heightUnit',   path: 'heightUnit' } ,   	  	  
    {label: 'BMI',   path: 'BMI' } , 
    {label: 'BMICategory',   path: 'BMICategory' } ,       
    {label: 'temperature',   path: 'temperature' } ,   	  
    {label: 'temperatureUnit',   path: 'temperatureUnit' } ,   	  
    {label: 'bloodPressure',   path: 'bloodPressure' } , 
    {label: 'bloodGroupe',   path: 'bloodGroupe' } ,   
    {label: 'bloodGlucoseLevel',   path: 'bloodGlucoseLevel' } ,   	  
    {label: 'heartBeat',   path: 'heartBeat' } ,   	  
    {label: 'oxygenSaturation',   path: 'oxygenSaturation' } ,   	  
    {label: 'RedBloodCell',   path: 'RedBloodCell' } , 
    {label: 'WhiteBloodCell',   path: 'WhiteBloodCell' } ,   	  
    {label: 'Hgb',   path: 'Hgb' } ,   	  
    {label: 'GSR',   path: 'GSR' } , 
    {label: 'GSP',   path: 'GSP' } ,   	  
    {label: 'leftEyeSpherical',   path: 'leftEyeSpherical' } , 
    {label: 'rightEyeSpherical',   path: 'rightEyeSpherical' } ,   	  
    {label: 'systolicBoodPressureNo',   path: 'systolicBoodPressureNo' } , 
    {label: 'diastolicBloodPressureNo',   path: 'diastolicBloodPressureNo' } 

    //   { key: 'actions' , label: 'Actions', content: user =>( <button
    //   onClick={() => this.props.onDelete(user)} className="btn btn-danger btn-sm" >
    //   Delete
    // </button>)
    // }
    {key:'edit',label: '',content: user=>(<a onClick={() => this.props.onDelete(user)}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></a>)},
    {key:'delete',label: '',content: user=>(<a onClick={() => this.props.onDelete(user)}><i className="fas fa-lg fa-fw m-r-10 fa-trash"></i></a> )}
   
    ];
   
    render(){ 
       //console.log(this.columns) ;
        const {users,onSort,sortColumn} = this.props;
        return (
       <Table columns={this.columns}
       sortColumn={sortColumn} 
       onSort={onSort}
       data={users}
       />
        );
    }
}


export default UsersTable;