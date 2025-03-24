import React, { useEffect } from "react";
import {
  arrowleft,
  filterIcon,
  nextIcon,
  searchIcon,
  userGroup,
} from "@/app/global/svg";
import CustomerTable from "./customertable";
import { useState } from "react";
import { getCustomers } from "@/utils/api/admin/products";
import { TableSkeleton } from "@/app/admin_dashboard/management/customers/component/skeleton";

interface ApiUser {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  phoneNumber: string;
  avatar: string;
  state: string;
  country: string;
  shippingDetails:
    | {
        fullName: string;
        email: string;
        address: string;
        phoneNumber: string;
        state: string;
        country: string;
      }[]
    | null;
  role: string;
  status: string;
  emailVerified: boolean | null;
  totalOrders: number | null;
  lastOrderedAt: string | null;
  lastLoggedInAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  image: string;  // Change avatar to image
  mail: string;
  total_orders: number;
  last_purchase: string;
  time: string;
  phone_number: string;
  status: string;
  status_color: string;
  status_deep: string;
  gender: string;
  dob: string;
  address: string;
  state: string;
  country: string;
  shippingDetails:
    | {
        fullName: string;
        address: string;
        phoneNumber: string;
        state: string;
        country: string;
      }[]
    | null;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

interface PageInfo {
  page: number;
  size: number;
  has_next_page: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

interface ApiResponse {
  data: User[];
  page: PageInfo;
}

const ITEMS_PER_PAGE = 10;

export const CustomerModal = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filterRef = React.useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const transformApiUser = (apiUser: ApiUser): User => {
    const getStatusColors = (status: string) => {
      switch (status.toLowerCase()) {
        case "active":
          return { color: "#F5FFFC", deep: "#109368" };
        case "inactive":
          return { color: "#FEFBF0", deep: "#BA8603" };
        case "blocked":
          return { color: "#FFF5F5", deep: "#DC1827" };
        default:
          return { color: "#F5FFFC", deep: "#109368" };
      }
    };

    const statusColors = getStatusColors(apiUser.status);
    const lastLoginTime = apiUser.lastLoggedInAt
      ? new Date(apiUser.lastLoggedInAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Never";

    return {
      id: apiUser.id,
      name: apiUser.fullName,
      image: apiUser.avatar , // Change to image
      mail: apiUser.email,
      total_orders: apiUser.totalOrders || 0,
      last_purchase: apiUser.lastOrderedAt
        ? new Date(apiUser.lastOrderedAt).toLocaleDateString()
        : "No purchase yet",
      time: lastLoginTime,
      phone_number: apiUser.phoneNumber || "N/A",
      status: apiUser.status,
      status_color: statusColors.color,
      status_deep: statusColors.deep,
      gender: apiUser.gender || "Not specified",
      dob: apiUser.dob
        ? new Date(apiUser.dob).toLocaleDateString()
        : "Not specified",
      address: apiUser.address || "Not specified",
      state: apiUser.state || "Not specified",
      country: apiUser.country || "Not specified",
      shippingDetails: apiUser.shippingDetails,
      role: apiUser.role,
      emailVerified: apiUser.emailVerified || false,
      createdAt: new Date(apiUser.createdAt).toLocaleDateString(),
    };
  };

  const generatePaginationRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const getCurrentPageItems = () => {
    const filteredUsers = getFilteredUsers(allUsers);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    setUsers(paginatedUsers);
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    setPageInfo({
      page,
      size: ITEMS_PER_PAGE,
      hasPreviousPage: page > 1,
      has_next_page: page < totalPages,
      totalCount: filteredUsers.length
    });
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getFilteredUsers = (usersToFilter: User[] = allUsers) => {
    const searchTerm = search.toLowerCase();
    return usersToFilter.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm) ||
        user.mail.toLowerCase().includes(searchTerm);

      const matchesFilter =
        selectedFilter.toLowerCase() === "all" ||
        user.status.toLowerCase() === selectedFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getCustomers(1, 10);


      // Handle the API response correctly
      const apiData = response?.data;
      if (apiData && Array.isArray(apiData)) {
        const transformedUsers = apiData.map((user: ApiUser) => {
          const transformed = transformApiUser(user);
          return transformed;
        });
        
        setAllUsers(transformedUsers);
        setUsers(transformedUsers);

        if (response.data.page) {
          setPageInfo(response.data.page);
        }
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      const filteredUsers = getFilteredUsers(allUsers);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setUsers(filteredUsers.slice(startIndex, endIndex));
      
      setPageInfo({
        page,
        size: ITEMS_PER_PAGE,
        hasPreviousPage: page > 1,
        has_next_page: endIndex < filteredUsers.length,
        totalCount: filteredUsers.length
      });
    }
  }, [page, search, selectedFilter, allUsers]);

  if (loading) {
    return (
      <main className="mt-[120px] ml-[240px] h-full max-w-[1040px] w-full">
        <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
          <p className="text-text_strong text-[22px]">Customers</p>
        </div>
        <div className="mt-12">
          <TableSkeleton />
        </div>
      </main>
    );
  }


  if (!allUsers.length) {
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

  return (
    <main className="mt-[120px] ml-[240px] h-full max-w-[1040px] w-full">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Customers</p>
      </div>
      <div className="mt-12">
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
                  {["all", "Active", "Inactive", "Blocked"].map((status) => (
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
        <CustomerTable users={users} />

        <div className="flex justify-between p-4 border-t">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className={`text-text_weak flex items-center gap-2 ${
                page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <span>{arrowleft()}</span>
              <p>Previous</p>
            </button>

            <div className="flex gap-1">
              {generatePaginationRange(
                page,
                Math.ceil(allUsers.length / ITEMS_PER_PAGE)
              ).map((pageNum, index) => (
                <div
                  key={index}
                  onClick={() =>
                    typeof pageNum === "number" && handlePageChange(pageNum)
                  }
                  className={`h-10 w-10 flex items-center rounded-full justify-center ${
                    pageNum === page
                      ? "bg-fill text-black border"
                      : typeof pageNum === "number"
                      ? "cursor-pointer hover:bg-stroke_weak"
                      : "cursor-default"
                  }`}
                >
                  {pageNum}
                </div>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(allUsers.length / ITEMS_PER_PAGE)}
              className={`text-text_weak flex items-center gap-2 ${
                page >= Math.ceil(allUsers.length / ITEMS_PER_PAGE)
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <p>Next</p>
              <span>{nextIcon()}</span>
            </button>
          </div>

          <p className="font-medium text-base">
            Page {page} of {Math.ceil(allUsers.length / ITEMS_PER_PAGE)}
          </p>
        </div>
      </div>
    </main>
  );
};
