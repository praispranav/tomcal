import React,{Component} from "react";
import Table from './../common/table';


const x= <h1></h1>;
class UsersTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
    {label: 'Username',   path: 'login' } ,
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
    {label: 'firstname',   path: 'firstName' } ,   
    {label: 'initials',   path: 'initials' } ,   	  
    {label: 'lastname',   path: 'lastName' } ,   	  
    {label: 'DOB',   path: 'dateBirth' } ,   	  
    {label: 'gender',   path: 'gender' } ,   	  
    {label: 'address1',   path: 'address1' } ,   
    {label: 'address2',   path: 'address2' } ,   
    {label: 'address3',   path: 'address3' } ,           
    {label: 'zip',   path: 'zip' } ,   	  
    {label: 'city',   path: 'city' } ,   	      
    {label: 'state',   path: 'state' } ,   	          
    {label: 'country',   path: 'country' } ,   	  	  
    {label: 'website',   path: 'website' } , 
    {label: 'Linkedin',   path: 'linkedin' } ,       
    {label: 'mobile',   path: 'mobile' } ,   	  
    {label: 'phone',   path: 'phone' } ,   	  
    {label: 'skype',   path: 'skype' } , 
    {label: 'Clinic',   path: 'clinicSolo' } ,   
    {label: 'primInsuranceNo',   path: 'primInsuranceNo' } ,   	  
    {label: 'primInsurance',   path: 'primInsurance' } ,   	  
    {label: 'primInsuranceValidTill',   path: 'primInsuranceValidTill' } , 
    {label: 'secInsuranceNo',   path: 'secInsuranceNo' } ,   	  
    {label: 'secInsurance',   path: 'secInsurance' } ,   	  
    {label: 'secInsuranceValidTill',   path: 'secInsuranceValidTill' } , 
    {label: 'idPaper',   path: 'idPaper' } ,   	  
    {label: 'idPaperValidTill',   path: 'idPaperValidTill' } , 

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