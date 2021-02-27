import React, {useState, useEffect} from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar, momentLocalizer } from 'react-big-calendar';
const localizer = momentLocalizer(moment)

const CalendarActivity = () => {
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        fetchTrainingData();
    }, [])

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setStoreData(data))
        .catch(err => console.error(err))
    }
    
    const CreateEvents = storeData.map(tableRow => {
      let date = new Date(tableRow.date)
      
      const FormatDateForEvent = {
          start: date,
          end: new Date(moment(date).add(tableRow.duration, "minutes")),
          title: tableRow.activity
      }
      return FormatDateForEvent
  })
 
  return(
    <Calendar
      startAccessor="start"
      localizer={localizer}
      events={CreateEvents}
      endAccessor="end"
      defaultView="week"
      style={{height: 500, backgroundColor: '#6c938b'}}
    />
  )
  }


export default CalendarActivity;