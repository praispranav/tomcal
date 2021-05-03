import React from "react";
import { Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
} from "reactstrap";
import classnames from "classnames";
import BasicInfo from "./BasicInfoFields/BasicInfo";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
// import Actions from "./BasicInfoFields/Action";

//import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
//import Actions from "./../../../src/components/ticket/Action";
//import Card from "./../../../src/components/ticket/Card";
//import Filter from "./../../../src/components/ticket/Filters";
//import Category from "./../../../src/components/ticket/Category";
//import "./../../../src/components/kanban/style.css";

class TicketTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      dropdownOpen: false,
      readOnly: true,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setReadOnly = this.setReadOnly.bind(this);
  }
  toggleCollapse() {
    console.log("lll");
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  setReadOnly = () => this.setState({ readOnly: !this.state.readOnly });

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/tickets">Tickets</Link>
          </li>
        </ol>
        <h1 className="page-header">Ticket-profile</h1>
        <div className="row">
          <div className="col-xl-10">
            <Panel>
              <PanelHeader noButton>Tickets</PanelHeader>
              <PanelBody>
                <h1>Ticket name</h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#b6c2c9",
                  }}
                >
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "1" ? "#ffffff" : "#FFC69F"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "1"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "1"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "1"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                      >
                        <span className="d-sm-none">Medical History</span>
                        <span className="d-sm-block d-none">

                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "2" ? "#ffffff" : "#DED99F"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "2"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "2"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "2"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                      >
                        <span className="d-sm-none">Interview</span>
                        <span className="d-sm-block d-none">

                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "3" ? "#ffffff" : "#FFC6FF"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "3"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "3"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "3"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => {
                          this.toggleTab("3");
                        }}
                      >
                        <span className="d-sm-none">Inspection & Examination</span>
                        <span className="d-sm-block d-none">

						</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "4" ? "#ffffff" : "#FFF5AD"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "4"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "4"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "4"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "4",
                        })}
                        onClick={() => {
                          this.toggleTab("4");
                        }}
                      >
                        <span className="d-sm-none">Treatment</span>
                        <span className="d-sm-block d-none">
						</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "5" ? "#ffffff" : "#A2F5AD"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "5"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "5"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "5"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "5",
                        })}
                        onClick={() => {
                          this.toggleTab("5");
                        }}
                      >
                        <span className="d-sm-none">File Attachments</span>
                        <span className="d-sm-block d-none">
						
						</span>
                      </NavLink>
                    </NavItem>
					
                    <NavItem>
                      <NavLink
                        style={{
                          background: `${
                            this.state.activeTab === "7" ? "#ffffff" : "#FFFFC9"
                          }`,
                          borderTop: `${
                            this.state.activeTab === "7"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderLeft: `${
                            this.state.activeTab === "7"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          borderRight: `${
                            this.state.activeTab === "7"
                              ? "1px solid #b6c2c9"
                              : "none"
                          }`,
                          cursor: "default",
                        }}
                        className={classnames({
                          active: this.state.activeTab === "7",
                        })}
                        onClick={() => {
                          this.toggleTab("6");
                        }}
                      >
                        <span className="d-sm-none">Notes</span>
                        <span className="d-sm-block d-none">Notes</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div>
                    <div className="btn-group mx-2">
                      <ButtonDropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle color="default" caret>
                          Actions
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <i className="fa fa-save"></i> Save as PDF
                          </DropdownItem>
                          <DropdownItem onClick={() => this.setReadOnly()}>
                            <i className="fas fa-edit"></i>
                            Edit
                          </DropdownItem>
                          <DropdownItem>
                            <i className="fas fa-print"></i> Print
                          </DropdownItem>
                          <DropdownItem>
                            <i className="fas fa-archive"></i> Archive
                          </DropdownItem>
                          <DropdownItem>
                            <i className="ion-md-share"></i> Share{" "}
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>
                </div>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <BasicInfo readOnly={this.state.readOnly} setReadOnly={() => this.setReadOnly()} />
						<form>
							<div className="form-group row m-b-15">
								<label className="col-form-label col-md-3">Select registered patient from administration</label>
								<div className="col-md-9">
									<select className="form-control">
										<option>username first & Last name Date Brith 1</option>
										<option>username first & Last name Date Brith 2</option>
										<option>username first & Last name Date Brith 3</option>										
									</select>
								</div>
							</div>
						<h4>Medical History</h4>
						<h3>Personal Medical History</h3>
								<div className="form-group row m-b-15">
									<label className="col-form-label col-md-3">Chief Complaint*</label>
									<div className="col-md-9">
										<textarea className="form-control" rows="3"></textarea>
									</div>
								</div>
								<div className="form-group row m-b-15">
									<label className="col-form-label col-md-3">Symptoms</label>
									<div className="col-md-9">
										<textarea className="form-control" rows="5"></textarea>
									</div>
								</div>
								<div className="form-group m-b-10">
									<label className="col-sm-3 col-form-label">Western Disease/syndrome</label>								
									<input className="form-control" type="text" placeholder="Type in the name of the Western Syndrome or disease" />
								</div>
									<div className="form-group row m-b-10">
										<label className="col-md-3 col-form-label">Current Treatment</label>
										<div className="col-md-9">
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="regular_western" id="inlineCssCheckbox1" />
												<label htmlFor="inlineCssCheckbox1">Regular Western</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="ayurveda" id="inlineCssCheckbox2" />
												<label htmlFor="inlineCssCheckbox2">Ayurveda</label>
											</div>
										</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="homeopathy" id="inlineCssCheckbox3" />
												<label htmlFor="inlineCssCheckbox3">Homeopathy</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="tcm" id="inlineCssCheckbox4" />
												<label htmlFor="inlineCssCheckbox4">Traditional Chinese Medicine</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="naturopratic" id="inlineCssCheckbox5" />
												<label htmlFor="inlineCssCheckbox5">Naturopratic</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="osteopathic" id="inlineCssCheckbox6" />
												<label htmlFor="inlineCssCheckbox6">Osteopathic</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="shiatsu" id="inlineCssCheckbox7" />
												<label htmlFor="inlineCssCheckbox7">Shiatsu</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="reiki" id="inlineCssCheckbox8" />
												<label htmlFor="inlineCssCheckbox8">Reiki</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="tuina" id="inlineCssCheckbox9" />
												<label htmlFor="inlineCssCheckbox9">Tuina</label>
											</div>
											<div className="checkbox checkbox-css checkbox-inline">
												<input type="checkbox" value="other" id="inlineCssCheckbox10" />
												<label htmlFor="inlineCssCheckbox10">Other</label>
											</div>
											<div className="form-group row m-b-15">
												<label className="col-form-label col-md-3">Diseases & Illnesses</label>
												<div className="col-md-9">
													<textarea className="form-control" rows="2" placeholder="Diseases & Illnesses in the past" ></textarea>
												</div>
											</div>
											<div className="form-group row m-b-15">
												<label className="col-form-label col-md-3">Surgeries</label>
												<div className="col-md-9">
													<textarea className="form-control" rows="2" placeholder="Surgeries in the past" ></textarea>
												</div>
											</div>
											<div className="form-group row m-b-15">
												<label className="col-form-label col-md-3">Medicaments & Supplements in use</label>
												<div className="col-md-9">
													<textarea className="form-control" rows="2" placeholder="" ></textarea>
												</div>
											</div>
											<div className="form-group row m-b-15">
												<label className="col-form-label col-md-3">Allergies</label>
												<div className="col-md-9">
													<textarea className="form-control" rows="2" placeholder="" ></textarea>
												</div>
											</div>
											<div className="form-group row m-b-15">
												<label className="col-form-label col-md-3">Pregnancies</label>
												<div className="col-md-9">
													<textarea className="form-control" rows="2" placeholder="Pregnancies in the past" ></textarea>
												</div>
											</div>
										
									</div>

						</form>					
                  </TabPane>
                  <TabPane tabId="2">
                    <h4>Data input in spreadsheet</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="3">
                    <h4>Comments</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>

                  <TabPane tabId="4">
                    <h4>Reviews</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="5">
                    <h4>Sharing</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="6">
                    <h4>Notes</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                </TabContent>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketTabs;
