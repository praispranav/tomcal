import React,{Component} from "react";
import Table from './../common/table';


const x= <h1></h1>;
class UsersTable extends Component {
  columns = [
    //   {path: '_id', label: 'Id'},
    {label: 'Username',   path: 'login' } ,
    {key:'avatar', label: 'avatar',content: user=>(<span className="icon-img"><img src={user.imageSrc} alt="" /></span>) } ,
    {label: 'ClinicNo',   path: 'clinicNo' } ,   	      
    {label: 'DoctorNo',   path: 'doctorNo' } ,   	          
    {label: 'AppointmentNo',   path: 'appointmentNo' } ,   
    {label: 'AppointmentType',   path: 'appointmentType' } ,       
    {label: 'SessionType',   path: 'sessionType' } ,   	  
    {label: 'date',   path: 'date' } ,   	  
    {label: 'beginTime',   path: 'beginTime' } ,   	  
    {label: 'endTime',   path: 'endTime' } ,   	      
    {label: 'age',   path: 'age' } ,   	  
    {label: 'Complaint',   path: 'chiefComplaint' } ,   
    {label: 'WesternDisease',   path: 'WesternDisease' } ,   
    {label: 'symptoms',   path: 'symptoms' } ,           
    {label: 'currentTreatment',   path: 'currentTreatment' } ,   	  
    {label: 'diseasesIllnesses',   path: 'diseasesIllnesses' } ,   	      
    {label: 'surgeries',   path: 'surgeries' } ,   	          
    {label: 'medicamentsSupplements',   path: 'medicamentsSupplements' } ,   	  	  
    {label: 'allergies',   path: 'allergies' } , 
    {label: 'pregnancies',   path: 'pregnancies' } ,       
    {label: 'familyRole',   path: 'familyRole' } ,   	  
    {label: 'familyDisease',   path: 'familyDisease' } ,   	  
    {label: 'familyDiseaseYear',   path: 'familyDiseaseYear' } , 
    {label: 'familyDiseaseState',   path: 'familyDiseaseState' } ,   
    {label: 'medicalHistoryNote',   path: 'medicalHistoryNote' } ,   	  
    {label: 'socialRelationship',   path: 'socialRelationship' } ,   	  
    {label: 'habits',   path: 'habits' } , 
    {label: 'occupation',   path: 'occupation' } ,   	  
    {label: 'occupationState',   path: 'occupationState' } ,   	  
    {label: 'sport',   path: 'sport' } , 
    {label: 'sportFrequency',   path: 'sportFrequency' } ,   	  
    {label: 'hobbies',   path: 'hobbies' } , 
    {label: 'smoking',   path: 'smoking' } ,   	  
    {label: 'sugar',   path: 'sugar' } , 
    {label: 'alcohol',   path: 'alcohol' } ,   
    {label: 'tea',   path: 'tea' } , 
    {label: 'coffee',   path: 'coffee' } ,   	  
    {label: 'heroin',   path: 'heroin' } ,   	  
    {label: 'vitality',   path: 'vitality' } , 
    {label: 'appearance',   path: 'appearance' } ,   	  
    {label: 'appearanceNote',   path: 'appearanceNote' } , 
    {label: 'faceColorLustre',   path: 'faceColorLustre' } ,   	  
    {label: 'tongueShape',   path: 'tongueShape' } , 
    {label: 'tongueColor',   path: 'tongueColor' } ,
    {label: 'tongueQuality',   path: 'tongueQuality' } ,   
    {label: 'tongueNote',   path: 'tongueNote' } ,   
    {label: 'respiration',   path: 'respiration' } , 
    {label: 'speech',   path: 'speech' } ,   	  
    {label: 'cough',   path: 'cough' } ,   	      
    {label: 'odor',   path: 'odor' } ,   	          
    {label: 'appetite',   path: 'appetite' } ,   	  	  
    {label: 'appetiteNote',   path: 'appetiteNote' } , 
    {label: 'vomiting',   path: 'vomiting' } ,       
    {label: 'vomitingNote',   path: 'vomitingNote' } ,   	  
    {label: 'diet',   path: 'diet' } ,       
    {label: 'dietNote',   path: 'dietNote' } ,   
    {label: 'taste',   path: 'taste' } ,   	  
    {label: 'thirst',   path: 'thirst' } , 
    {label: 'defecation',   path: 'defecation' } ,   
    {label: 'urination',   path: 'urination' } ,   	  
    {label: 'urinationColor',   path: 'urinationColor' } ,   	  
    {label: 'sleeping',   path: 'sleeping' } , 
    {label: 'thermalFeeling',   path: 'thermalFeeling' } ,   	  
    {label: 'perspiration',   path: 'perspiration' } ,   	  
    {label: 'head',   path: 'head' } , 
    {label: 'eyes',   path: 'eyes' } ,   	  
    {label: 'ear',   path: 'ear' } , 
    {label: 'nose',   path: 'nose' } ,   	  
    {label: 'throat',   path: 'throat' } , 
    {label: 'painLocation',   path: 'painLocation' } ,   
    {label: 'painNature',   path: 'painNature' } , 
    {label: 'menstruationHistory',   path: 'menstruationHistory' } ,   	  
    {label: 'leukorrhea',   path: 'leukorrhea' } ,   	  
    {label: 'emotionalStatus',   path: 'emotionalStatus' } , 
    {label: 'emotionalNote',   path: 'emotionalNote' } ,   	  
    {label: 'interviewNote',   path: 'interviewNote' } , 
    {label: 'pulseSpeed',   path: 'pulseSpeed' } ,   	  
    {label: 'pulseDepth',   path: 'pulseDepth' } ,   	  
    {label: 'pulseStrength',   path: 'pulseStrength' } ,   	          
    {label: 'pulseShape',   path: 'pulseShape' } ,   	          
    {label: 'pulseTension',   path: 'pulseTension' } ,   	          
    {label: 'pulseRhythm',   path: 'pulseRhythm' } ,   	  
    {label: 'pulseNote',   path: 'pulseNote' } ,   	  
    {label: 'physicalAppearance',   path: 'physicalAppearance' } ,   	          
    {label: 'physicalPalpationEpigastrium',   path: 'physicalPalpationEpigastrium' } , 
    {label: 'physicalPalpationEpigastriumNote ',   path: 'physicalPalpationEpigastriumNote' } ,
    {label: 'physicalPalpationAbdomen',   path: 'physicalPalpationAbdomen' } ,   
    {label: 'physicalPalpationAcupoint',   path: 'physicalPalpationAcupoint' } , 
    {label: 'rangeMotion',   path: 'rangeMotion' } ,   	  
    {label: 'painLevel',   path: 'painLevel' } ,   	      
    {label: 'physicalExaminationNote',   path: 'physicalExaminationNote' } ,   	          
    {label: 'TCMDiagnosis',   path: 'TCMDiagnosis' } ,   	  	  
    {label: 'principleTreatment',   path: 'principleTreatment' } ,   	  	  
    {label: 'acuPoints',   path: 'acuPoints' } ,   	  	  
    {label: 'stimulationDuration',   path: 'stimulationDuration' } , 
    {label: 'stimulationMethod',   path: 'stimulationMethod' } ,       
    {label: 'needleManipulation',   path: 'needleManipulation' } ,   	  
    {label: 'acuTreatmentNote',   path: 'acuTreatmentNote' } ,       
    {label: 'TDP',   path: 'TDP' } ,   
    {label: 'TDPNote',   path: 'TDPNote' } ,   	  
    {label: 'moxibustion',   path: 'moxibustion' } , 
    {label: 'tuina',   path: 'tuina' } ,   
    {label: 'herbalFormula1',   path: 'herbalFormula1' } ,   	  
    {label: 'materiaMedica1',   path: 'materiaMedica1' } ,   	  
    {label: 'mmDosage1',   path: 'mmDosage1' } , 
    {label: 'mmUnit1',   path: 'mmUnit1' } ,     
    {label: 'herbalFormula2',   path: 'herbalFormula2' } ,   	  
    {label: 'materiaMedica2',   path: 'materiaMedica2' } ,   	  
    {label: 'mmDosage2',   path: 'mmDosage2' } , 
    {label: 'mmUnit2',   path: 'mmUnit2' } ,     
    {label: 'auricularAcupuncture',   path: 'auricularAcupuncture' } , 
    {label: 'dietTherapy',   path: 'dietTherapy' } ,
    {label: 'recommendation',   path: 'recommendation' } ,   

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