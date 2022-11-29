import WeeklyCalendar from "./WeeklyCalendar";
import CalendarHeader from "./CalendarHeader";
import MonthlyCalendar from "./MonthlyCalendar";
import { useState, useEffect } from "react";
import { parseISO, isSameDay } from "date-fns";

export default function EventCalendar() {
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarLink =
    "https://sesh.fyi/api/calendar/v2/1NtkbbR6C4pu9nfgPwPGQn.ics";

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
          setCalendarEvents(events);
        }
      }
    };
  }

  function getDayEvents(date) {
    /*
    Gets all events on the specified date.
    */
    if (calendarEvents == null) return date;

    date.calendarEvents = [];

    for (var i = 0; i < Object.keys(calendarEvents).length; i++) {
      calendarEvents[i].date = calendarEvents[i].date.replace(/(\r\n|\n|\r)/gm, "");

      var eventDate = parseISO(calendarEvents[i].date);

      if (isSameDay(eventDate, date)) {
        date.calendarEvents.push(calendarEvents[i]);
      }
    }

    return date.calendarEvents;
  }

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <div className="px-10 py-5 lg:flex  lg:h-full lg:flex-col lg:px-20">
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isMonthlyView={isMonthlyView}
        setIsMonthlyView={setIsMonthlyView}
        calendarLink={calendarLink}
      />

      {/* Calendar */}

      {isMonthlyView ? (
        <MonthlyCalendar 
          selectedDate={selectedDate}
          events={calendarEvents} 
          setSelectedDate={setSelectedDate} 
          getDayEvents={getDayEvents}
        />
      ) : (
        <WeeklyCalendar
          selectedDate={selectedDate}
          events={calendarEvents}
          setSelectedDate={setSelectedDate}
          getDayEvents={getDayEvents}
        />
      )}

      {/* Bottom list */}
      
    </div>
  );
}
