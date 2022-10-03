import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker'
// import TimePicker from 'react-time-picker/dist/entry.nostyle';
import "./App.css"; 


const locales= {
  "en-US": require("date-fns/locale/en-US")  
}

const localizer= dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

const events = [
  {
      title: "Big Meeting",
      allDay: true,
      start: new Date(2022, 6, 0),
      startTime: new Date("12:00 AM"),
      end: new Date(2022, 6, 0),
      endTime: new Date("12:00 AM")
  },
  {
      title: "Vacation",
      start: new Date(2022, 6, 7),
      startTime: new Date("12:00 AM"),
      end: new Date(2022, 6, 10),
      endTime: new Date("12:00 AM")
  },
  {
      title: "Conference",
      start: new Date(2022, 6, 20),
      startTime: new Date("12:00 AM"),
      end: new Date(2022, 6, 23),
      endTime: new Date("12:00 AM")
  },
];



function App() {

  const [newEvent, setNewEvent] = useState({ title: "", start: "", startTime: "", end: "", endTime: ""})
  const [allEvents, setAllEvents ] = useState(events)
  const [Time, setTime] = useState(events);

  function handleEvents (){
    
    for(let i=0; i<allEvents.length; i++){
      const date1= new Date(allEvents[i].start)
      const newstartDate= new Date(newEvent.start)
      const date2= new Date(allEvents[i].end)
      const newendDate= new Date(newEvent.end)

      const stTime= new Date(allEvents[i].startTime)
      const newstTime= new Date(newEvent.startTime)
      const enTime= new Date(allEvents[i].endTime)
      const newenTime= new Date(newEvent.endTime)

      if(((date1 <= newstartDate) && (newstartDate <= date2)) && ((date1 <= newendDate) && (date2 <= newendDate))){       //This is used to detect the clash of events
          console.log(allEvents);
          alert("There is a Clash of Events occurring!!!")                                                  //If two or more events are occurring on the same day then it will show an ALERT
          break;
      }
      if(((stTime <= newstTime) && (newstTime <= enTime)) && ((stTime <= newenTime) && (enTime <= newenTime))){
          console.log(allEvents);
          alert("There is a Clash of Events occurring wrt TIME!!!")                                                  //If two or more events are occurring on the same day then it will show an ALERT
          break;
      }    
    }

    setAllEvents([...allEvents, newEvent])                     //
  }

  const handleTime = (newTime) =>{
    setTime(newTime)
  }


  return (
    <div className="App">
      <nav className="navbar bg-light">                     
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Timeline</span>       
        </div>
        <div className="flex-container">
          <input type="text" placeholder="Add Title" style={{marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
          <DatePicker placeholderText="Start Date" style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start})}/>
          <TimePicker placeholderText="Start Time" style={{marginRight:"10px"}} selected={newEvent.start} onChange={handleTime} value={newEvent.startTime}/>
          <DatePicker placeholderText="End Date" style={{marginRight:"10px"}} selected={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end})}/>
          <TimePicker placeholder="End Time" selected={newEvent.end} onChange={handleTime} value={newEvent.endTime}/>
        </div>
      </nav>
      <button className="btn btn-info" stlye={{ marginTop: "10px ", width: "20px " }} onClick={handleEvents}> Add Event </button>            
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor={"end"} style={{height: 500, margin: "50px"}}/>
    </div>
  );
}

export default App;
