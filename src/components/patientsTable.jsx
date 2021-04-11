import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';

const x= <h1></h1>;
class PatientsTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
    {label: 'Username',   path: 'patients.username' } ,
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.patients.imageSrc} alt="" /></span>) } ,
    {label: 'firstname',   path: 'patients.contactName.first' } ,   
    {label: 'initials',   path: 'patients.contactName.initials' } ,   	  
    {label: 'lastname',   path: 'patients.contactName.last' } ,   	  
    {label: 'DOB',   path: 'patients.dateBirth' } ,   	  
    {label: 'gender',   path: 'patients.gender' } ,   	  
    {label: 'address1',   path: 'patients.address1' } ,   
    {label: 'address2',   path: 'patients.address2' } ,   
    {label: 'address3',   path: 'patients.address3' } ,           
    {label: 'zip',   path: 'patients.zip' } ,   	  
    {label: 'city',   path: 'patients.city' } ,   	      
    {label: 'state',   path: 'patients.state' } ,   	          
    {label: 'country',   path: 'patients.country' } ,   	  	  
    {label: 'website',   path: 'website' } , 
    {label: 'Linkedin',   path: 'linkedin' } ,       
    {label: 'mobile',   path: 'patients.mobile' } ,   	  
    {label: 'phone',   path: 'patients.phone' } ,   	  
    {label: 'skype',   path: 'patients.skype' } , 
    {label: 'Clinic',   path: 'clinicSolo' } ,   
    {label: 'primInsuranceNo',   path: 'primInsuranceNo' } ,   	  
    {label: 'primInsurance',   path: 'primInsurance' } ,   	  
    {label: 'primInsuranceValidTill',   path: 'primInsuranceValidTill' } , 
    {label: 'secInsuranceNo',   path: 'secInsuranceNo' } ,   	  
    {label: 'secInsurance',   path: 'secInsurance' } ,   	  
    {label: 'secInsuranceValidTill',   path: 'secInsuranceValidTill' } , 
    {label: 'idPaper',   path: 'idPaper' } ,   	  
    {label: 'idPaperValidTill',   path: 'idPaperValidTill' } , 
    {label: 'height',   path: 'height' } ,   	  
    {label: 'weight',   path: 'weight' } , 
    {label: 'BMI',   path: 'BMI' } ,   

    //   { key: 'actions' , label: 'Actions', content: user =>( <button
    //   onClick={() => this.props.onDelete(user)} className="btn btn-danger btn-sm" >
    //   Delete
    // </button>)
    // }
    {key:'edit',label: '',content: user=> <Link to={`/clinic/patients/${user._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
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


export default PatientsTable;