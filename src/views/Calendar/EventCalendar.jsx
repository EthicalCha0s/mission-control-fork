import {
  ClockIcon
} from "@heroicons/react/20/solid";
import WeeklyCalendar from "./WeeklyCalendar";
import CalendarHeader from "./CalendarHeader";
import MonthlyCalendar from "./MonthlyCalendar"
import { useState, useEffect } from "react";

const days = [
  { date: "2021-12-27", events: [] },
  { date: "2021-12-28", events: [] },
  { date: "2021-12-29", events: [] },
  { date: "2021-12-30", events: [] },
  { date: "2021-12-31", events: [] },
  { date: "2022-01-01", isCurrentMonth: true, events: [] },
  { date: "2022-01-02", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-03",
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-04", isCurrentMonth: true, events: [] },
  { date: "2022-01-05", isCurrentMonth: true, events: [] },
  { date: "2022-01-06", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-07",
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: "Date night",
        time: "6PM",
        datetime: "2022-01-08T18:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-08", isCurrentMonth: true, events: [] },
  { date: "2022-01-09", isCurrentMonth: true, events: [] },
  { date: "2022-01-10", isCurrentMonth: true, events: [] },
  { date: "2022-01-11", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-12",
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: "2PM",
        datetime: "2022-01-25T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-13", isCurrentMonth: true, events: [] },
  { date: "2022-01-14", isCurrentMonth: true, events: [] },
  { date: "2022-01-15", isCurrentMonth: true, events: [] },
  { date: "2022-01-16", isCurrentMonth: true, events: [] },
  { date: "2022-01-17", isCurrentMonth: true, events: [] },
  { date: "2022-01-18", isCurrentMonth: true, events: [] },
  { date: "2022-01-19", isCurrentMonth: true, events: [] },
  { date: "2022-01-20", isCurrentMonth: true, events: [] },
  { date: "2022-01-21", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-22",
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: "Maple syrup museum",
        time: "3PM",
        datetime: "2022-01-22T15:00",
        href: "#",
      },
      {
        id: 5,
        name: "Hockey game",
        time: "7PM",
        datetime: "2022-01-22T19:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-23", isCurrentMonth: true, events: [] },
  { date: "2022-01-24", isCurrentMonth: true, events: [] },
  { date: "2022-01-25", isCurrentMonth: true, events: [] },
  { date: "2022-01-26", isCurrentMonth: true, events: [] },
  { date: "2022-01-27", isCurrentMonth: true, events: [] },
  { date: "2022-01-28", isCurrentMonth: true, events: [] },
  { date: "2022-01-29", isCurrentMonth: true, events: [] },
  { date: "2022-01-30", isCurrentMonth: true, events: [] },
  { date: "2022-01-31", isCurrentMonth: true, events: [] },
  { date: "2022-02-01", events: [] },
  { date: "2022-02-02", events: [] },
  {
    date: "2022-02-03",
    events: [
      {
        id: 7,
        name: "Cinema with friends",
        time: "9PM",
        datetime: "2022-02-04T21:00",
        href: "#",
      },
    ],
  },
  { date: "2022-02-04", events: [] },
  { date: "2022-02-05", events: [] },
  { date: "2022-02-06", events: [] },
];
const selectedDay = days.find((day) => day.isSelected);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EventCalendar() {

  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const calendarLink  = "https://sesh.fyi/api/calendar/v2/1NtkbbR6C4pu9nfgPwPGQn.ics";
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


  function getEventData(){
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      calendarLink,
      true
    );
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== 1) {
          var lines = request.responseText.split("\n");
          var events = {}
          var events_i = 0;
          for (var i = 0; i < lines.length; i++) {
            if (lines[i].includes('DTSTART')) {
              var date = lines[i].split(":");
              events[events_i] = {date: date[1]};
            }
            else if (lines[i].includes('SUMMARY')) {
              var title = lines[i].split(":");
              events[events_i]["title"] = title[1];
            }
            else if (lines[i].includes('END:VEVENT')) {
              events_i++;
            }
          }
          // console.log(events)
          setCalendarEvents(events)
        }
      }
    };
  }

  useEffect(() => {
    getEventData()
    console.log("Selected date:", selectedDate)
  },[]);

  return (
    <div className="px-10 py-5 lg:flex  lg:h-full lg:flex-col lg:px-20">

      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} isMonthlyView={isMonthlyView} setIsMonthlyView={setIsMonthlyView} calendarLink={calendarLink} monthNames={monthNames}/>

      {/* Calendar */}
      
      {isMonthlyView? <MonthlyCalendar selectedDate={selectedDate} events={calendarEvents} />:<WeeklyCalendar selectedDate={selectedDate} events={calendarEvents} />}
      

      {/* Bottom list */}
      {selectedDay?.events.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
