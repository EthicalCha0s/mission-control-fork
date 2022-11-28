import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  addDays,
  subDays,
  getDay,
  getDate,
  getMonth,
  getYear,
  startOfWeek,
  endOfWeek,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  isToday,
  setMonth,
  isSameDay,
  parseISO,
  format
} from "date-fns";
import { useEffect } from "react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getLastMonday(date) {
  while (getDay(date) != 1) {
    date = subDays(date, 1);
  }
  return date;
}

function getNextSunday(date) {
  while (getDay(date) != 0) {
    date = addDays(date, 1);
  }
  return date;
}


export default function MonthlyCalendar({ selectedDate, setSelectedDate, events }) {

  const [monthEvents, setMonthEvents] = useState([]);

  function getDayEvents(date) {  
    if (events == null)
      return date;
  
    date.events = [];
  
    for(var i = 0; i < 10; i++){
      events[i].date = events[i].date.replace(/(\r\n|\n|\r)/gm, "");

      var eventDate = parseISO(events[i].date);

      if(isSameDay(eventDate, date)){
        date.events.push(events[i]);
        console.log(date, events[i])
        console.log(date, date.events)
        console.log(events[i].date + events[i].title)
      }
    }
    
    return date.events;
  }
  

  function getMonthEvents(){

    let startDate = getLastMonday(startOfWeek(startOfMonth(selectedDate), {weekStartsOn:1}));
    let endDate = getNextSunday(endOfWeek(lastDayOfMonth(selectedDate), {weekStartsOn:1}));

    let day = startDate;
    let days = [];

    while (day <= endDate) {
      day.events = getDayEvents(day);
      days.push(day);
      day = addDays(day, 1);
    }

    return(days);
  }

  useEffect(() => {
    setMonthEvents(getMonthEvents())
  }, [selectedDate]);

  return (
    <div className="overflow-hidden rounded-3xl">
      <div className="rounded-xl shadow  ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-600 bg-calendar-deepblue text-center text-xs font-semibold leading-6 text-moon-gold lg:flex-none">
          <div className="bg-calendar-deepblue py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-calendar-deepblue py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-600 text-xs leading-6 text-gray-200 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
         {monthEvents.map((day) => (   
              <div
                key={day.toString()}
                className={classNames(
                  isSameMonth(day, selectedDate)
                    ? "bg-calendar-deepblue"
                    : "bg-calendar-deepblue-hover text-gray-200",
                  "relative py-2 px-3"
                )}
                onClick={() => {setSelectedDate(day)}}
              >
                <time
                  dateTime={day.toString()}
                  className={
                    isSameDay(day, selectedDate)
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {getDate(day)}
                </time>
                {day.events.length > 0  ? (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.date + event.title}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-400 group-hover:text-indigo-600">
                            {event.title}
                          </p>
                          <time
                            dateTime={event.date}
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                          >
                            {format( parseISO(event.date), "hh:mm aaaaa'm'")} 
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-200">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                ): (<div className="py-10"/>)}
              </div>
            ))} 
            </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
            {monthEvents.map((day) => (
              <button
                key={day.toString()}
                type="button"
                className={classNames(
                  isSameMonth(day, selectedDate)
                    ? "bg-calendar-deepblue"
                    : "bg-calendar-deepblue-hover",
                  (day.isSelected || isToday(day)) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && isToday(day) && "text-moon-gold",
                  !day.isSelected &&
                    isSameMonth(day, selectedDate) &&
                    !isToday(day) &&
                    "text-gray-400",
                  !day.isSelected &&
                    !isSameMonth(day, selectedDate) &&
                    !isToday(day) &&
                    "text-gray-500",
                  "flex h-14 flex-col py-2 px-3 hover:bg-calendar-deepblue-hover focus:z-10"
                )}
                onClick={() => {setSelectedDate(day)}}
              >
                <time
                  dateTime={day.toString()}
                  className={classNames(
                    isSameDay(day, selectedDate)? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white" :
                      "flex h-6 w-6 items-center justify-center rounded-full","ml-auto"
                  )}
                >
                  {getDate(day)} {/* {day.toString().split("-").pop().replace(/^0/, "")} */}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
