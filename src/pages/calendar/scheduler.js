/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, GroupingState, IntegratedGrouping, IntegratedEditing,EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  AllDayPanel,
 GroupingPanel,
  DayView,

} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MomentUtils from '@date-io/moment';

import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import MenuItem from '@material-ui/core/MenuItem';

import {
  teal, indigo,
} from '@material-ui/core/colors';


import AppointmentFormContainerBasic from './../../components/appointmentForm';
//////////////////////
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveAppointment,deleteAppointment} from './../../services/appointments';
import {getClinics,getClinic} from './../../services/clinics';
import {getDoctors,getDoctor} from './../../services/doctors';
import {getPatients,getPatient} from './../../services/patients';
import {getRandomColor,dateCheck} from './../../utils/event-utils';
import moment from 'moment';





const containerStyles = theme => ({
  container: {
    width: theme.spacing(15),
    padding: 0,
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'left',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '80%',
  },
});



const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
    //marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    padding: theme.spacing(1),
  },
  selectBox: {
    minHeight: theme.spacing(6.5),
    width: '100%',
  },

});

/* eslint-disable-next-line react/no-multi-comp */
class SchedulerCal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resources: [],
      grouping: [{
        resourceName: 'clinicId',
      }, {
        resourceName: 'doctors',
      }],
      //currentDate: '2017-04-28',
      currentDate: new Date(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
      fullSize: false,
      patients: [],
      selectPatients: [],
    };



    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }



 
  // updateResource(id, itemAttributes) {
  //   const index = this.state.resources.findIndex(x=> x.id === id);
  //   if (index === -1)  {}
  //   else{
  //      this.setState({
  //       resources: [
  //          ...this.state.resources.slice(0,index),
  //          Object.assign({}, this.state.resources[index], itemAttributes),
  //          ...this.state.resources.slice(index+1)
  //       ]
  //     });
  //   }
     
  // }

  
 


  async populateCalendarEvents() {
		const { data: appointments } = await http.get(apiUrl+"/appointments");

		console.log(appointments);
		this.setState({ data:appointments.map((appointment)=>({
			id: appointment._id,
			title:appointment.complaint,
      doctors: [appointment.doctorNo._id],
      clinicId: appointment.clinicNo._id,
			startDate:appointment.startTime,
			endDate:appointment.endTime,
			color:appointment.color,
			note:appointment.note,
		
			patientNo: appointment.patientNo._id,
			patientName: appointment.patientUser.contactName.first+" "+appointment.patientUser.contactName.last,
			patientDob: appointment.patientNo.dateBirth
			
				
		
		})) }
		);
	}
/*     async populateCalendarResources() {
		const { data: doctors } = await http.get(apiUrl+"/appointments");
  
		console.log(doctors);

    const Doctors = doctors.map((doctor)=>({
			id: doctor.doctorNo._id,
			title:doctor.doctorUser.contactName.first+" "+doctor.doctorUser.contactName.last,
      color:doctor.color
		}));
    console.log(this.state.resources);
   
    // const resources = [...this.state.resources];
    // for (let i in resources) {
    //   if (i === 0) {
    //     resources[i].instances = Object.assign({},Doctors);
    //      break; //Stop this loop, we found it!
    //   }
    // }
    
    //this.setState({resources:this.updateResource(0,{instances: Doctors})});



   const resources = [...this.state.resources];
   const  result = resources.map(el => el.fieldName === 'doctors' ? {...el, instances: Doctors} : el);

   this.setState({resources:result});

	
	}

  async populateCalendarClinics() {
		const { data: clinics } = await http.get(apiUrl+"/appointments");
  
    const Clinics =  clinics.map((clinic)=>({
			id: clinic.clinicNo._id,
			text: clinic.clinicNo.companyInfo.businessName,
    
		}));
    // const resources = [...this.state.resources];
    // for (let i in resources) {
    //   if (i === 1) {
    //     resources[i].instances =  Object.assign({},Clinics);
    //      break; 
    //   }
    // }


     //this.setState({resources:this.updateResource(1,{instances: Clinics})});
  

     const resources = [...this.state.resources];
     const  result = resources.map(el => el.fieldName === 'clinicId' ? {...el, instances: Clinics} : el);
 
     this.setState({resources:result});

	} */


  async populateCalendarResources() {
		const { data: doctors } = await http.get(apiUrl+"/appointments");
    const Doctors = doctors.map((doctor)=>({
			id: doctor.doctorNo._id,
			text:doctor.doctorUser.contactName.first+" "+doctor.doctorUser.contactName.last,
      color:doctor.color
		}));

    const { data: clinics } = await http.get(apiUrl+"/appointments");
  
    const Clinics =  clinics.map((clinic)=>({
			id: clinic.clinicNo._id,
			text: clinic.clinicNo.companyInfo.businessName,
    
		}));


     const resources = [ {
      fieldName: 'doctors',
      title: 'Doctors',
      instances: Doctors,
      allowMultiple: true,
    }, {
      fieldName: 'clinicId',
      title: 'Clinic',
      instances: Clinics,
    }];

   this.setState({resources:resources});

	
	}

 


  async componentDidMount() {
 
    //await this.populateCalendarClinics();
    await this.populateCalendarEvents();
    await this.populateCalendarResources();
}




  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
    console.log(this.state);
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });

    console.log(this.state);
  }


  mapToViewModel(appointment) {
    return {
      //id: appointment._id,
      start: appointment.start,
      end: appointment.end,
      title: appointment.complaint,
      patientNo: appointment.patientNo,
      clinicNo: appointment.clinicNo,
      doctorNo: appointment.doctorNo,
      note: appointment.note,		  
    };
  }


  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      resources,
      grouping,
      startDayHour,
      endDayHour
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            //currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <GroupingState
            grouping={grouping}
          />
          
          <DayView
            startDayHour={9}
            endDayHour={15}
            intervalCount={2}
          />

       
          <Appointments />
          <Resources
            data={resources}
            mainResourceName="doctors"
          />
         <IntegratedGrouping />
          <IntegratedEditing />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          {/* <Toolbar />
          <ViewSwitcher /> */}
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
            
            <GroupingPanel />
     
          <DragDropProvider />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(SchedulerCal);