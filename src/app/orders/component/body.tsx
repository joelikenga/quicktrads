import { ordersIcon } from "@/app/global/svg";

export const Body = () => {
  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Orders</p>
        <p className="text-text_weak text-base ">{`Add, update and select your address information`}</p>
      </div>


      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
        {/* no order */}
        { false &&
          <div className=" w-full flex justify-center items-center mt-12">
            <div className="w-full max-w-[400px] flex flex-col gap-8 items-center">
              {ordersIcon()}

              <div className="flex flex-col gap-4 font-normal text-center">
                <p className="text-text_strong text-[22px] ">{`There are currently no order`}</p>
                <p className="text-text_weak text-base ">{`Discover the latest trends and start building your dream wardrobe today!`}</p>
              </div>
              <button className="bg-text_strong text-background font-medium text-base h-12 w-full px-6 flex rounded-full items-center justify-center">Continue shopping</button>
            </div>
          </div>
        }

        {/* ------ content ------- */}

        {
          <div className="mt-12 w-full">
            {/* search and filter */}
            <div className="flex "

          </div>
        }

      </div>
    </div>
  );
};
