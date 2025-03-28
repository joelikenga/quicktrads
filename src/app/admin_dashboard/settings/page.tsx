import { SettingsideNav } from "@/app/admin_dashboard/settings/component/settingsideNav";
import { Navbar } from "../component/navbar";

const Page = () => {
      return (
          <>
              <Navbar /><div className="w-full px-10">
              <div className="w-full max-w-7xl mx-auto">
                  <SettingsideNav />
                  {/* <Body /> */}
                  </div>
              </div>
          </>
      )
}
export default Page;