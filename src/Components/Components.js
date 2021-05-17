import React,{useState} from 'react'
import Calendar from "./Clinic/Calendar"
import "./assets/css/mycss.css"
import SwitchToTask from "./utils/SwitchToTask"

export default function Components() {
    const [ isToggle, setisToggle ] = useState(true)
    return (
        <div>
            
            <SwitchToTask 
                state={isToggle}  
                handleClick={(event)=> setisToggle(event)}/>
            
            <Calendar />
        </div>
    )
}
