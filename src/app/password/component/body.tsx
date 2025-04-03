

export const Body = () => {
  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b px-4 md:px-0  md:ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Profile</p>
        <p className="text-text_weak text-base ">Update your profile details</p>
      </div>

      {/* input */}

      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">



        {/* inputs */}

        <div className="flex flex-col items-start gap-4 w-full ">
          {/* old and new password */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 justify-start items-center w-full">
            {/* old */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm md:text-base">Old password</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="Password"
                />
              </div>
            </div>

            {/* new */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm md:text-base">New password</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="Password"
                />
              </div>
            </div>
          </div>

          {/* phone and Gender */}
          <div className="flex gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm md:text-base">Confirm password</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="Password"
                />
              </div>
            </div>


          </div>

        </div>
        {/* button */}

        <div className="flex gap-8 justify-start items-center w-full text-base font-medium  mt-2 mb-8">
          <button className="max-w-[153px] w-full text-background bg-text_strong rounded-full px-6 h-10 flex justify-center items-center">
            Update
          </button>
          <button className="max-w-[153px] w-full text-text_strong border bg-background rounded-full px-6 h-10 flex justify-center items-center">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
