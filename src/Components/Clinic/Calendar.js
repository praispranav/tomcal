import React from 'react'
import Cal from "react-calendar"
// import "react-calendar/dist/Calendar.css"

export default function Calendar() {
    return (
        <div className="cal m-1-top">
            <Cal showWeekNumbers />
        </div>
    )
}
