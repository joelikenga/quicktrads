import React from "react";
import {
  arrowleft,
  filterIcon,
  nextIcon,
  searchIcon,
  userGroup,
} from "@/app/global/svg";
import CustomerTable from "./customertable";

// array of data - to visualize the main idea
const People = [
  {
    name: "Emeka Frank",
    mail: "Emekafrank@gmail.com",
    total_orders: 102,
    last_purchase: "Jan 19 2025",
    time: "06:41 AM",
    phone_number: "+234 (270) 555-0117",
    status: "active",
    status_color: "#F5FFFC",
    status_deep: "#109368",
  },
  {
    name: "Daniel Olawale",
    mail: "Danielolawale@gmail.com",
    total_orders: 0,
    last_purchase: "Jan 19 2025",
    time: "06:41 AM",
    phone_number: "+234 (907) 555-0101",
    status: "inacitve",
    status_color: "#FEFBF0",
    status_deep: "#BA8603",
  },
  {
    name: "Emeka Frank",
    mail: "Emekafrank@gmail.com",
    total_orders: 76,
    last_purchase: "Jan 19 2025",
    time: "06:41 AM",
    phone_number: "+234 (270) 555-0117",
    status: "active",
    status_color: "#F5FFFC",
    status_deep: "#109368",
  },
  {
    name: "Jimoh Adesina",
    mail: "Jimohsample@gmail.com",
    total_orders: 25,
    last_purchase: "Jan 19 2025",
    time: "06:41 AM",
    phone_number: "+234 (270) 555-0117",
    status: "Blocked",
    status_color: "#FFF5F5",
    status_deep: "#DC1827",
  },
];

/* a modal - that checks if the data is empty if yes it displays the no customer message
    if it is not empty then it shows the data from the array
*/
import { useState } from "react";

export const CustomerModal = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filterRef = React.useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  if (People !== null) {
    return (
      <main className="mt-[120px] ml-[240px] h-full max-w-[1040px] w-full">
        {/*  */}
        <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
          <p className="text-text_strong text-[22px]">Customers</p>
        </div>
        <div className="mt-12">
          {/* search and filter */}
          <div className="flex w-full justify-start items-center gap-4 pb-12">
            <div className="flex gap-2 h-8 w-[220px] border bg-fill items-center rounded-full px-4">
              {searchIcon()}
              <input
                className="h-full w-full bg-transparent text-text_strong placeholder:text-text_strong outline-none"
                placeholder="Search by name"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="h-8 text-text_strong border border-stroke_weak flex rounded-full items-center px-4 gap-2"
              >
                {filterIcon()}
                <span>
                  {selectedFilter === "all" ? "Filter" : selectedFilter}
                </span>
              </button>

              {showFilter && (
                <div className="absolute top-10 right-0 bg-background border border-stroke_weak rounded-lg shadow-lg w-[150px] z-10">
                  <div className="p-2 flex flex-col gap-1">
                    {[
                      "all",
                      "Active",
                      "Inactive",
                      "Blocked",
                    ].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedFilter(status);
                          setShowFilter(false);
                        }}
                        className={`text-left px-3 py-2 rounded-md hover:bg-fill ${
                          selectedFilter === status ? "bg-fill" : ""
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <CustomerTable users={People} />

          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-7">
              <p className="flex items-center gap-2">
                <span>{arrowleft()}</span>
                <p>Previous</p>
              </p>
              <div className="flex gap-4">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p> ... </p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
              </div>

              <p className="flex items-center gap-2">
                <p>Next</p>
                <span>{nextIcon()}</span>
              </p>
            </div>

            {/*  */}
            <div>
              <p>Page 1 of 10</p>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="mt-[120px] ml-[240px] h-full max-w-[1040px] w-full">
        <p className="text-[18px] font-[400] text-text_strong pb-6">
          Customers
        </p>

        {/* no customer display */}
        <section className="flex justify-center text-center items-center">
          <div>
            <div className="w-max max-w-full mx-auto pb-4">{userGroup()}</div>
            <h3 className="pb-2 text-[18px] leading-[28px]">
              There are currently no customers!
            </h3>
            <p className="text-[14px] leading-[22px] w-[290px] text-text_weak mx-auto pt-2">
              It looks like there are currently no customers available at the
              moment
            </p>
          </div>
        </section>
      </main>
    );
  }
};
