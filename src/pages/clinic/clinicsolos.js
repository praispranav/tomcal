import React,{Component} from 'react';
//import { Link } from 'react-router-dom';
import { Link, withRouter  } from 'react-router-dom';

import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import axios from 'axios';
import {getClinics,deleteClinic} from './../../services/clinics';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import {paginate} from '../../utils/paginate';
import ClinicSolosTable from '../../components/clinicsolosTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from 'lodash';
import http from './../../services/httpService';
import {apiUrl} from './../../config/config.json';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ClinicSoloTableData extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        users:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }
    
      this.handleDelete = this.handleDelete.bind(this);
    }

  async componentDidMount(){
      const {data} = await getClinics();
      this.setState({users:data});
    }

  handleDelete = async (user)=>{
 

     ///delete
		const originalUsers = this.state.users;
		const users = this.state.users.filter(User => User._id !== user._id);
		this.setState({users});
		try{
			await http.delete(apiUrl+"/clinicsolo/"+ user._id);
		}
		catch(ex){
			//ex.request
			//ex.response

			if(ex.response && ex.response === 404){
				alert("already deleted");
			}
			
			this.setState({users:originalUsers});
		}
    ////
 
  };
 

  //sorting columns
  handleSort = (sortColumn)=>{
    this.setState({sortColumn})
 };
  handlePageChange = (page)=>{
    console.log(page);
    this.setState({currentPage:page});
  
 };
 
 handleSearch = (query)=>{
  console.log(query);
  this.setState({searchQuery:query,currentPage:1});
};


 getDataPgnation= ()=>{
  const {pageSize,currentPage,users:Users,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = Users;
  if(searchQuery){
    console.log(searchQuery);
    filtered = Users.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const users = paginate(sorted,currentPage,pageSize);
  return {data:users};
 }

  render(){
    const {length:count} = this.state.users; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    // if(count === 0)  return "<p>No data available</p>";
   
    const {data:users} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">ClinicSolos Table</li>
			</ol>
			<h1 className="page-header">ClinicSolos </h1>
			<Panel>
				<PanelHeader>
					ClinicSolos Management
				</PanelHeader>
  
         <React.Fragment>
           <ToastContainer />
           {/* {user && ( <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/user/new">Add User</Link>  </button>)} */}
            <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}>  <Link to="/clinic/clinicsolos/new">Add ClinicSolo</Link>  </button>
				<div className="table-responsive">
     
           
			<p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 
		   <SearchBox value={searchQuery} onChange={this.handleSearch} />
		   <ClinicSolosTable users={users} 
		   onDelete={this.handleDelete}
		   onSort={this.handleSort}
		   sortColumn={sortColumn}
		   />
        
	 </div> 
       
       </React.Fragment>

			 <hr className="m-0" />
			 <PanelBody>
       	<div className="d-flex align-items-center justify-content-center">
           <Pagination 
             itemsCount ={count}
             pageSize={pageSize}
             onPageChange={this.handlePageChange}
             currentPage={currentPage}
           />
				</div>
			 </PanelBody>
			</Panel>
		</div>
  
    )
  }
}

export default ClinicSoloTableData