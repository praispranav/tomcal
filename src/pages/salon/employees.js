import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import {getEmployees} from './../../services/employees';
import 'bootstrap/dist/css/bootstrap.min.css';
//import FloatSubMenu from './../../components/float-sub-menu/float-sub-menu';
import Pagination from '../../common/pagination';
import {paginate} from '../../utils/paginate';
import EmployeesTable from '../../components/employeesTable.jsx';
import SearchBox from './../../common/searchBox';
import _ from "lodash";
import http from "./../../services/httpService";
import { apiUrl } from "./../../config/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Input, Modal, Label, ModalHeader, ModalBody, Row } from "reactstrap";

// Icons imports
import newIcon from "../../assets/Icons/new.svg";
import editIcon from "../../assets/Icons/edit.svg";
import trashIcon from "../../assets/Icons/trash.svg";
import csvIcon from "../../assets/Icons/csv.svg";
import xlsIcon from "../../assets/Icons/xls.svg";
import pdfIcon from "../../assets/Icons/pdf.svg";
import sharingIcon from "../../assets/Icons/sharing.svg";

class EmployeesTable extends Component {
  
  constructor(props) {
		super(props);
      this.state = {
        employees:[],
        pageSize: 10,
        currentPage: 1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery: "",
        errors:{},
      }

    }

  async componentDidMount(){
      //const {data:employees} = await axios.get("http://localhost:4500/api/employees");
      const data = await getEmployees();
      console.log(data.data);
      this.setState({employees:data.data});
    }

  handleDelete = (user)=>{
     console.log(user);
     const employees = this.state.employees.filter(el=>el._id!==user._id);
     this.setState({employees:employees});
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
  const {pageSize,currentPage,employees:Employees,sortColumn,searchQuery} = this.state;
  //
  //filter maybe next time
  let filtered = Employees;
  if(searchQuery){
    console.log(searchQuery);
    filtered = Employees.filter((el)=> el.email.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    el.username.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  //
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
  const employees = paginate(sorted,currentPage,pageSize);
  return {data:employees};
 }

  render(){
    const {length:count} = this.state.employees; 
    const {pageSize,currentPage,sortColumn,searchQuery} = this.state;
    if(count === 0)  return "<p>No data available</p>";
   
    const {data:employees} = this. getDataPgnation();


    return(
     
      <div>
			<ol className="breadcrumb float-xl-right">
				<li className="breadcrumb-item"><Link to="/">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/">Tables</Link></li>
				<li className="breadcrumb-item active">Data Tables</li>
			</ol>
			<h1 className="page-header">Employees </h1>
			<Panel>
				<PanelHeader>
					Employees Management
				</PanelHeader>
  
         <React.Fragment>
         <button className="btn btn-default active m-r-5 m-b-5" style={{marginBottom:20},{marginLeft:20},{marginTop:20}}><Link to="/clinic/add_user">Add Employee</Link></button>
				<div className="table-responsive">
       
           
        <p className="page-header float-xl-left" style={{marginBottom:5},{marginLeft:20},{marginTop:5}}>{count} entries</p> 
       <SearchBox value={searchQuery} onChange={this.handleSearch} />
       <EmployeesTable employees={employees} 
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

export default EmployeesTable