import { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function CalendarHeader({monthlyView, setMonthlyView, calendarLink}) {
    return (  
        
<header className="flex items-center justify-between  py-4 px-6 lg:flex-none">
    <h1 className="text-lg font-semibold text-gray-200">
      <time dateTime="2022-01">January 2022</time>
    </h1>
    <div className="flex items-center">
      <div className="flex items-center rounded-md shadow-sm md:items-stretch">
        <button
          type="button"
          className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
        >
          Today
        </button>
        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
        <button
          type="button"
          className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden md:ml-4 md:flex md:items-center">
        <Menu as="div" className="relative">
          <Menu.Button
            type="button"
            className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            {
              monthlyView?
              "Month view":"Week View"
            }
            <ChevronDownIcon
              className="ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm w-full"
                      )}
                      onClick={() => setMonthlyView(false)}
                    >
                      Week view
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700",
                        "block px-4 py-2 text-sm w-full"
                      )}
                      onClick={() => {
                        console.log("Git mnobt", monthlyView);
                        setMonthlyView(true);
                        console.log(monthlyView);
                      }}
                    >
                      Month views
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="ml-6 h-6 w-px bg-gray-300" />
        <button
          type="button"
          className="flex items-center ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {navigator.clipboard.writeText(calendarLink)}}
        >
          Copy calendar link
          <LinkIcon
            className="ml-2 h-5 w-5 text-gray-200"
            aria-hidden="true"
          />
        </button>
      </div>
      <Menu as="div" className="relative ml-6 md:hidden">
        <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open menu</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm w-full"
                    )}
                  >
                    Go to today
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm w-full"
                    )}
                    onClick={() => setMonthlyView(false)}
                  >
                    Day view
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    href="#"
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      "block px-4 py-2 text-sm w-full"
                    )}
                    onClick={() => setMonthlyView(true)}
                  >
                    Month view
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  </header>
  )
}