import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';

const x= <h1></h1>;
class DoctorsTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img sm-r-10"><img src={user.doctors.imageSrc} alt="" /></span>) } ,	
    {label: 'Doctorname',   path: 'doctors.username' } ,
    {label: 'Firstname',   path: 'doctors.contactName.first' } ,   
    {label: 'Initials',   path: 'doctors.contactName.initials' } ,   	  
    {label: 'Lastname',   path: 'doctors.contactName.last' } ,   	  
    {label: 'DOB',   path: 'doctors.dateBirth' } ,   	  
    {label: 'Gender',   path: 'doctors.gender' } ,   	  
    {label: 'Address1',   path: 'doctors.address1' } ,   
    {label: 'Address2',   path: 'doctors.address2' } ,   
    {label: 'Address3',   path: 'doctors.address3' } ,           
    {label: 'Zip',   path: 'doctors.zip' } ,   	  
    {label: 'City',   path: 'doctors.city' } ,   	      
    {label: 'State',   path: 'doctors.state' } ,   	          
    {label: 'Country',   path: 'doctors.country' } ,   	  	  
    {label: 'Linkedin',   path: 'linkedin' } ,       
    {label: 'Mobile',   path: 'mobile' } ,   	  
    {label: 'Phone',   path: 'phone' } ,   	  
    {label: 'Skype',   path: 'skype' } , 
    {label: 'IBAN',   path: 'IBAN' } ,   
    {label: 'Bank',   path: 'bank' } ,   
    {label: 'Branch Bank',   path: 'branchOfBank' } ,   
    {label: 'Clinic',   path: 'clinicSolo' } ,   
    {label: 'Prim. InsuranceNo',   path: 'primInsuranceNo' } ,   	  
    {label: 'Prim. Insurance',   path: 'primInsurance' } ,   	  
    {label: 'Prim. Insurance Valid Till',   path: 'primInsuranceValidTill' } , 
    {label: 'Sec. InsuranceNo',   path: 'secInsuranceNo' } ,   	  
    {label: 'Sec. Insurance',   path: 'secInsurance' } ,   	  
    {label: 'Sec. Insurance Valid Till',   path: 'secInsuranceValidTill' } , 
    {label: 'ID-Paper',   path: 'idPaper' } ,   	  
    {label: 'ID-Paper Valid Till',   path: 'idPaperValidTill' } , 
    {label: 'HIPIO No',   path: 'healthcareProviderIdentifierOrganisation' } ,   	  
    {label: 'HIPII No',   path: 'healthcareProviderIdentifierIndividual' } ,   	  
    {label: 'Treatments',   path: 'treatments' } ,   	  	
    {label: 'LicenseNo',   path: 'licenseNo' } ,   	  
    {label: 'License Valid Till',   path: 'licenseValidTill' } ,   	      
    {label: 'OrganizationA Name',   path: 'organizationAName' } ,   	          
    {label: 'OrganizationA Member No',   path: 'organizationAMemberNo' } ,   	  	  
    {label: 'OrganizationB Name',   path: 'organizationBName' } ,   	          
    {label: 'OrganizationB Member No',   path: 'organizationBMemberNo' } ,   	  	  

    //   { key: 'actions' , label: 'Actions', content: user =>( <button
    //   onClick={() => this.props.onDelete(user)} className="btn btn-danger btn-sm" >
    //   Delete
    // </button>)
    // }
    
    {key:'edit',label: '',content: user => <Link to={`/clinic/doctors/${user._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
    {key:'delete',label: '',content: user=>(<a onClick={() => this.props.onDelete(user)}><i className="fas fa-lg fa-fw m-r-10 fa-trash"></i></a> )}
   
    ];
   
    render(){ 
       //console.log(this.columns) ;
        const {doctors,onSort,sortColumn} = this.props;
        return (
       <Table columns={this.columns}
       sortColumn={sortColumn} 
       onSort={onSort}
       data={doctors}
       />
        );
    }
}


export default DoctorsTable;