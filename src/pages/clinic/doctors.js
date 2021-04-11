import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import {getDoctors} from './../../services/doctors';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import {paginate} from '../../utils/paginate';
import DoctorsTable from '../../components/doctorsTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from 'lodash';

class DoctorTableData extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        doctors:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }

    }

  async componentDidMount(){
      //const {data:doctors} = await axios.get("http://localhost:4500/api/doctors");
      const data = await getDoctors();
      console.log(data.data);
      this.setState({doctors:data.data});
    }

  handleDelete = (user)=>{
     console.log(user);
     const doctors = this.state.doctors.filter(el=>el._id!==user._id);
     this.setState({doctors:doctors});
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
  const {pageSize,currentPage,doctors:Doctors,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = Doctors;
  if(searchQuery){
    console.log(searchQuery);
    filtered = Doctors.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const doctors = paginate(sorted,currentPage,pageSize);
  return {data:doctors};
 }

  render(){
    const {length:count} = this.state.doctors; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    // if(count === 0)  return "<p>No data available</p>";
   
    const {data:doctors} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">Data Tables</li>
			</ol>
			<h1 className="page-header">Doctors </h1>
			<Panel>
				<PanelHeader>
					Doctors Management
				</PanelHeader>
  
         <React.Fragment>
         <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}><Link to="/clinic/add_user">Add Doctor</Link></button>
				<div className="table-responsive">
       
           
        <p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 
       <SearchBox value={searchQuery} onChange={this.handleSearch} />
       <DoctorsTable doctors={doctors} 
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

export default DoctorTableData