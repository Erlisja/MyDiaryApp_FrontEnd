import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

function CalendarComponent({ entryDates }) {
  const [dateValues, setDateValues] = useState([]);

  useEffect(() => {
    setDateValues(entryDates.map((date) => new Date(date)));
  }, [entryDates]);

  const tileContent = ({ date, view }) => {
    // Check if the current date is in the entryDates array
    const formattedDate = date.toISOString().split("T")[0]; 
    if (dateValues.some((entryDate) => entryDate.toISOString().split("T")[0] === formattedDate)) {
      return <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'red', margin: 'auto' }} />;
    }
  };

  return (
    <div>
      <Calendar
        tileContent={tileContent}
      />
    </div>
  );
}

export default CalendarComponent;
