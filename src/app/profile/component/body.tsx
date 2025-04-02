import { ProfileAvatar } from "@/app/global/profileGenerator";
import { arrowDown,  uploadIcon } from "@/app/global/svg";

export const Body = () => {
  return (
    <div className=" flex flex-col gap-8 h-[82px] border-b px-4 md:px-0  md:ml-[280px] mt-[150px]">
      <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
        <p className="text-text_strong text-[22px]">Profile</p>
        <p className="text-text_weak text-base ">Update your profile details</p>
      </div>

      {/* input */}

      <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
        {/* info */}

        {/* {
          <div className="w-full h-11 flex justify-start items-center border-l-4 rounded-l-xl bg-fill border-error_1 px-2 gap-2">
            <i>{redInfoSmall()}</i>
            <p>
              Please compete your profile details and upload an image for your
              profile
            </p>
          </div>
        } */}

        {/* image upload */}
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          {<ProfileAvatar name={"User"} size="large" />}
          <div className="flex gap-2 pr-6 pl-5 h-8 justify-center items-center border rounded-full font-medium text-sm">
            <i>{uploadIcon()}</i>
            <p>Upload image</p>
          </div>
        </div>

        {/* inputs */}

        <div className="flex flex-col items-start gap-2 sm:gap-4 w-full ">
          {/* fullName and Email */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-start items-center w-full">
            {/* fullName */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Full name</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Email</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* phone and Gender */}
          <div className="flex flex-col sm:flex-row gap-2  md:gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Phone number</p>
              <div className="w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
              <p className="text-sm sm:text-base">Gender</p>
              <div className="w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                  // value={`male`}
                />
                <span className="  absolute top-[42px] right-4">
                  {arrowDown()}
                </span>
                {false && (
                  <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute z-20 mt-1 ">
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Male
                    </div>
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Male
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* country and DOB */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-8 justify-start items-center w-full">
            {/* Phone */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Date of birth</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="date"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
              <p className="text-sm sm:text-base">Country</p>
              <div className=" w-full">
                <div className="outline-none border rounded-lg h-10 px-4  w-full flex items-center">
                  Nigeria
                </div>
                <span className="  absolute top-[42px] right-4">
                  {arrowDown()}
                </span>
                {
                  <div className=" py-4 border w-full rounded-xl gap-2 flex flex-col absolute ">
                    <div className="h-9 p-4 bg-fill flex items-center">
                      Nigeria
                    </div>
                    <div className="h-9 p-4 bg-fill flex items-center">USA</div>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* State and Address */}
          <div className="flex flex-col sm:flex-row  gap-8 justify-start items-center w-full">
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">State</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
            {/* State */}
            <div className="flex flex-col gap-2 w-full max-w-[323px]">
              <p className="text-sm sm:text-base">Address</p>
              <div className=" w-full">
                <input
                  className="outline-none border rounded-lg h-10 px-4  w-full"
                  placeholder=""
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        {/* button */}

        <div className="flex md:gap-8 gap-2 justify-start items-center w-full text-base font-medium  mt-2 mb-8">
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
