import WeeklyCalendar from "./WeeklyCalendar";
import CalendarHeader from "./CalendarHeader";
import MonthlyCalendar from "./MonthlyCalendar";
import { useState, useEffect } from "react";

export default function EventCalendar() {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarLink =
    "https://sesh.fyi/api/calendar/v2/1NtkbbR6C4pu9nfgPwPGQn.ics";
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getEventData() {
    var request = new XMLHttpRequest();
    request.open("GET", calendarLink, true);
    request.send(null);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== 1) {
          var lines = request.responseText.split("\n");
          var events = {};
          var events_i = 0;
          for (var i = 0; i < lines.length; i++) {
            if (lines[i].includes("DTSTART")) {
              var date = lines[i].split(":");
              events[events_i] = { date: date[1] };
            } else if (lines[i].includes("SUMMARY")) {
              var title = lines[i].split(":");
              events[events_i]["title"] = title[1];
            } else if (lines[i].includes("END:VEVENT")) {
              events_i++;
            }
          }
          // console.log(events)
          setCalendarEvents(events);
        }
      }
    };
  }

  useEffect(() => {
    getEventData();
    console.log("Selected date:", selectedDate);
  }, []);

  return (
    <div className="px-10 py-5 lg:flex  lg:h-full lg:flex-col lg:px-20">
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isMonthlyView={isMonthlyView}
        setIsMonthlyView={setIsMonthlyView}
        calendarLink={calendarLink}
        monthNames={monthNames}
      />

      {/* Calendar */}

      {isMonthlyView ? (
        <MonthlyCalendar selectedDate={selectedDate} events={calendarEvents} setSelectedDate={setSelectedDate}/>
      ) : (
        <WeeklyCalendar
          selectedDate={selectedDate}
          events={calendarEvents}
          setSelectedDate={setSelectedDate}
        />
      )}

      {/* Bottom list */}
      
    </div>
  );
}
