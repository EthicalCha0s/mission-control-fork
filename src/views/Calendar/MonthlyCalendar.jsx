import {
  ClockIcon,
} from "@heroicons/react/20/solid";
import {
  addDays,
  subDays,
  getDay,
  getDate,
  startOfWeek,
  endOfWeek,
  lastDayOfMonth,
  startOfMonth,
  isSameMonth,
  isToday,
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


export default function MonthlyCalendar({ 
  selectedDate, 
  setSelectedDate, 
  events,
  getDayEvents
}) {
  const [monthEvents, setMonthEvents] = useState([]);  

  function getMonthEvents(){
    /*
    Gets all days of the selected month, with their respective events.
    */

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
  }, [selectedDate, events]);

  return (
    <div className="overflow-hidden rounded-3xl">
      <div className="rounded-xl shadow  ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div className="grid grid-cols-7 gap-px border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-calendar-deepblue text-center text-xs font-semibold leading-6 text-moon-blue dark:text-moon-gold lg:flex-none">
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="dark:bg-calendar-deepblue bw-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-300 dark:bg-gray-600 text-xs leading-6 text-gray-200 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
         {monthEvents.map((day) => (   
              <div
                key={day.toString()}
                className={classNames(
                  isSameMonth(day, selectedDate)
                    ? "dark:bg-calendar-deepblue bg-white"
                    : "dark:bg-calendar-deepblue-hover bg-gray-50 dark:text-gray-200 ",
                  "relative py-2 px-3"
                )}
                onClick={() => {setSelectedDate(day)}}
              >
                <time
                  dateTime={day.toString()}
                  className={
                    isSameDay(day, selectedDate)
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-moon-blue font-semibold text-white"
                      : "text-black dark:text-gray-200"
                  }
                >
                  {getDate(day)}
                </time>
                {day.events.length > 0  ? (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.date + event.title}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-black dark:text-gray-400 group-hover:text-moon-blue">
                            {event.title}
                          </p>
                          <time
                            dateTime={event.date}
                            className="ml-3 hidden flex-none text-black dark:text-gray-500 group-hover:text-moon-blue xl:block"
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
                    ? "dark:bg-calendar-deepblue bg-white"
                    : "dark:bg-calendar-deepblue-hover bg-gray-50",
                  "flex h-14 flex-col py-2 px-3 dark:hover:bg-calendar-deepblue-hover focus:z-10 dark:text-gray-200 text-black"
                )}
                onClick={() => {setSelectedDate(day)}}
              >
                <time
                  dateTime={day.toString()}
                  className={classNames(
                    isSameDay(day, selectedDate)? "flex h-6 w-6 items-center justify-center rounded-full bg-moon-blue font-semibold text-white" :
                      "flex h-6 w-6 items-center justify-center rounded-full","ml-auto"
                  )}
                >
                  {getDate(day)}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full dark:bg-gray-400 bg-moon-blue"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {getDayEvents(selectedDate)?.length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {getDayEvents(selectedDate).map((event) => (
              <li
                key={event.date + event.title}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                  <time
                    dateTime={event.date}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {format( parseISO(event.date), "hh:mm aaaaa'm'")} 
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

    </div>
  );
}
