// components/UserTable.tsx
import {  bin, userGroup, restoreIcn } from "@/app/global/svg";
import { Lora } from "next/font/google";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProfileAvatar } from "@/app/global/profileGenerator";

interface User {
  id: string;
  name: string;
  image: string;
  mail: string;
  total_orders: number;
  last_purchase: string;
  time: string;
  phone_number: string;
  status: string;
  status_color: string;
  status_deep: string;
}

interface UserTableProps {
  users: User[];
}

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const CustomerTable: React.FC<UserTableProps> = ({ users }) => {
  const router = useRouter();
  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [restoreCustomer, setRestoreCustomer] = useState(false);

  const clear = () => {
    setDeleteCustomer((prev) => !prev);
  };

  const restore = () => {
    setRestoreCustomer((prev) => !prev);
  };

  const handleRowClick = (userId: string) => {
    router.push(`/admin_dashboard/management/customers/${userId}`);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-t border-b lg:w-[1080px] border-stroke_weak">
          {/* Table Header */}
          <thead className="border-b border-stroke_weak">
            <tr className="w-full">
              <th>
                <p className="py-[11px] pl-[16px] w-[192px] h-[44px] text-[14px] leading-[22px] font-[400] text-left">
                  User details
                </p>
              </th>
              <th>
                <p className="text-left w-[230px] h-[44px] text-[14px] leading-[22px] font-[400] py-[12px] pl-[16px]">
                  Contact information
                </p>
              </th>
              <th>
                <p className="text-left w-[120px] h-[44px] text-[14px] leading-[22px] font-[400] py-[12px] pl-[16px]">
                  Total orders
                </p>
              </th>
              <th>
                <p className="text-left w-[226px] h-[44px] text-[14px] leading-[22px] font-[400] py-[12px] pl-[16px]">
                  Last purchase
                </p>
              </th>
              <th>
                <p className=" w-[150px] h-[44px] text-[14px] leading-[22px] font-[400] py-[12px] pl-[16px] text-center">
                  Status
                </p>
              </th>
              <th className="w-[120px]"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.length > 0 ? (
              users.map((user, key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleRowClick(user.id)}
                >
                  <td className="pt-[16px] pl-[16px] h-[80px] flex gap-3 items-center">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                      {user?.image.length >0 ? (
                        <Image
                          src={user.image}
                          width={40}
                          height={40}
                          alt={`${user.name}'s avatar`}
                          className="w-full h-full object-cover"
                        />
                      ) : <ProfileAvatar name={user?.name} size="medium" />}

                    </div>
                    <p>{user.name}</p>
                  </td>
                  <td className="pt-[16px] pl-[16px] h-[80px]">
                    <p className="text-base leading-[22px] pb-[4px] text-text_strong font-[400]">
                      {user.mail}
                    </p>
                    <p className="text-base leading-[22px] text-text_weak font-[400]">
                      {user.phone_number}
                    </p>
                  </td>

                  <td className="pt-[16px] pl-[16px]">{user.total_orders}</td>
                  <td className="pt-[16px] pl-[16px] h-[80px] flex gap-2">
                    <p>{user.last_purchase}</p>
                    <p>{user.time}</p>
                  </td>

                  <td
                    className={`w-[150px] pt-[16px] pl-[16px] h-[80px] text-center`}
                  >
                    <div
                      style={{
                        backgroundColor: user.status_color,
                        color: user.status_deep,
                      }}
                      className="w-[100px] flex gap-1 h-[24px] rounded-full justify-center items-center text-[14px] leading-[19.07px] font-[500] mx-auto"
                    >
                      <span
                        style={{ backgroundColor: user.status_deep }}
                        className="w-[8px] h-[8px] rounded-full"
                      ></span>
                      {user.status}
                    </div>
                  </td>

                  {/* options */}
                  <td className="flex w-[120px] h-[80px] justify-center items-center gap-2">
                    {/* <span className="cursor-pointer selection:no-underline">
                      {edit()}
                    </span> */}
                    <span
                      onClick={clear}
                      className="cursor-pointer selection:no-underline"
                    >
                      {bin()}
                    </span>
                    <span
                      onClick={restore}
                      className="cursor-pointer selection:no-underline"
                    >
                      {restoreIcn()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-max mx-auto pb-4">{userGroup()}</div>
                    <h3 className="text-[18px] leading-[28px]">
                      No matching customers found
                    </h3>
                    <p className="text-[14px] leading-[22px] text-text_weak">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* delete user display */}
      <div
        className={`${
          deleteCustomer ? "block" : "hidden"
        } fixed flex top-0 left-0 justify-center items-center z-[1000] w-full h-full bg-black/70`}
      >
        <div className="w-[480px] h-[390px] flex items-center justify-center rounded-[20px] p-[48px] bg-white">
          <div className="w-[384px] flex flex-col justify-center">
            <span className="w-max mx-auto">{userGroup()}</span>
            <h3
              className={`text-[22px] ${lora.className} leading-[28px] font-[400] text-center`}
            >
              {` Are you sure you want to block customer's account?`}
            </h3>
            <p className="text-base w-[384px] leading-[22px] text-center font-[400] pt-[16px]">
              {`This action will block customer's data temporarily. If you
              're not ready to make changes, you can cancel block for
              later instead`}
            </p>

            {/* block and cancel */}
            <div className="flex gap-3 mt-[32px] items-center">
              <div
                onClick={clear}
                className="w-[184px] cursor-pointer selection:no-underline h-[48px] rounded-full border border-text_strong py-[13px] bg-text_strong text-white px-[71.5px] flex items-center justify-center"
              >
                Block
              </div>
              <div
                onClick={clear}
                className="w-[184px] cursor-pointer selection:no-underline h-[48px] rounded-full border border-stroke_strong py-[13px] px-[71.5px] flex items-center justify-center"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* restore user display */}
      <div
        className={`${
          restoreCustomer ? "block" : "hidden"
        } fixed flex top-0 left-0 justify-center items-center z-[1000] w-full h-full bg-black/70`}
      >
        <div className="w-[480px] h-[390px] flex items-center justify-center rounded-[20px] p-[48px] bg-white">
          <div className="w-[384px] flex flex-col justify-center">
            <span className="w-max mx-auto">{userGroup()}</span>
            <h3
              className={`${lora.className} text-[22px] leading-[28px] font-[400] text-center`}
            >
              Are you sure you want to restore customer’s account?
            </h3>
            <p className="text-base w-[384px] leading-[22px] text-center font-[400] pt-[16px]">
              This action will restore customer’s data permanently and customer
              will be able to perform all activities on their account
            </p>

            {/* block and cancel */}
            <div className="flex gap-3 mt-[32px] items-center">
              <div
                onClick={restore}
                className="w-[184px] cursor-pointer selection:no-underline h-[48px] rounded-full border border-text_strong py-[13px] bg-text_strong text-white px-[71.5px] flex items-center justify-center"
              >
                Restore
              </div>
              <div
                onClick={restore}
                className="w-[184px] cursor-pointer selection:no-underline h-[48px] rounded-full border border-stroke_strong py-[13px] px-[71.5px] flex items-center justify-center"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
