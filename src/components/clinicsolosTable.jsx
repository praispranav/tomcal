import React,{Component} from "react";
import Table from './../common/table';
import { Link, withRouter } from 'react-router-dom';

const x= <h1></h1>;
class ClinicSolosTable extends Component {
  columns = [
      {path: '_id', label: 'Id'},

    {key:'logo', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.clinics.imageSrc} alt="" /></span>) } ,
    {label: 'Username',   path: 'clinics.username' } ,	
    {label: 'email',   path: 'clinics.email' } ,   
    {label: 'ClinicNo',   path: 'clinicSoloNo' } ,   
    {label: 'Clinic',   path: 'companyInfo.businessName' } ,       
    {label: 'Firstname',   path: 'clinics.contactName.first' } ,   
    {label: 'initials',   path: 'clinics.contactName.initials' } ,   	  
    {label: 'Lastname',   path: 'clinics.contactName.last' } ,   	  
    {label: 'DOB',   path: 'clinics.dateBirth' } ,   	  
    {label: 'gender',   path: 'clinics.gender' } ,   	  
    {label: 'Address 1',   path: 'clinics.address1' } ,   
    {label: 'Address 2',   path: 'clinics.address2' } ,   
    {label: 'Address 3',   path: 'clinics.address3' } ,           
    {label: 'zip',   path: 'clinics.zip' } ,   	  
    {label: 'city',   path: 'clinics.city' } ,   	      
    {label: 'state',   path: 'clinics.state' } ,   	          
    {label: 'Country',   path: 'clinics.country' } ,   	  	  
    {label: 'website',   path: 'website' } ,   
    {label: 'Linkedin',   path: 'linkedin' } ,       
    {label: 'mobile',   path: 'clinics.mobile' } ,   	  
    {label: 'phone',   path: 'clinics.phone' } ,   	  
    {label: 'skype',   path: 'clinics.skype' } , 
    {label: 'IBAN',   path: 'IBAN' } ,   
    {label: 'Bank',   path: 'bank' } ,   
    {label: 'Branch Bank',   path: 'branchOfBank' } ,   
    // {label: 'subscription',   path: 'subscription' } ,   	  
    // {label: 'subscriptionEndDate',   path: 'subscriptionEndDate' } ,   	  
    {label: 'HIPIO No',   path: 'healthcareProviderIdentifierOrganisation' } ,   	  
    {label: 'HIPII No',   path: 'healthcareProviderIdentifierIndividual' } ,   	  
    {label: 'ChamberCommerce No',   path: 'chamberCommerceNo' } ,   
    {label: 'TaxPayerNo',   path: 'taxPayerNo' } ,   
    {label: 'treatments',   path: 'treatments' } ,   
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
    {key:'edit',label: '',content: user=><Link to={`/clinic/clinicsolos/${user._id}`}><i className="far fa-lg fa-fw m-r-10 fa-edit"></i></Link>},
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


export default ClinicSolosTable;