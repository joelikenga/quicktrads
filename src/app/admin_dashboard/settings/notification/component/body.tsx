"use client";
import { getSettings, updateSettings } from "@/utils/api/admin/products";
import { errorToast, successToast } from "@/utils/toast/toast";
import { useEffect, useState } from "react";
import Router from 'next/router';
import { success } from "@/app/global/svg";

export const Body = () => {
  const [loading, setLoading] = useState(true);
  // Initialize all options as false
  const [option, setOption] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [option5, setOption5] = useState(false);
  const [option6, setOption6] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();

      if (res.data) {
        // Only update states after successful API response
        setOption(res.data.customer.orderUpdates);
        setOption2(res.data.customer.customerMessages);
        setOption3(res.data.customer.reviewAlerts);
        setOption4(res.data.customer.customerActivity);
        setOption5(res.data.admin.SuspeciousActivity);
        setOption6(res.data.admin.passwordChange);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      errorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    const interval = setInterval(fetchSettings, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSettingUpdate = async (
    type: 'customer' | 'admin',
    field: string,
    value: boolean
  ) => {
    try {
      const currentSettings = {
        customer: {
          orderUpdates: option,
          customerMessages: option2,
          reviewAlerts: option3,
          customerActivity: option4,
        },
        admin: {
          SuspeciousActivity: option5,
          passwordChange: option6,
        }
      };

      // Update the specific field
      if (type === 'customer') {
        currentSettings.customer[field as keyof typeof currentSettings.customer] = value;
      } else {
        currentSettings.admin[field as keyof typeof currentSettings.admin] = value;
      }

      await updateSettings(currentSettings);
      // Router.reload()
      successToast('Settings updated');
    } catch (error) {
      
      errorToast( `Failed to update settings ${error}`);
      throw error;
    }
  };

  const addOption = async () => {
    const newValue = !option;
    setOption(newValue);
    await handleSettingUpdate('customer', 'orderUpdates', newValue);
  };

  const addOption2 = async () => {
    const newValue = !option2;
    setOption2(newValue);
    await handleSettingUpdate('customer', 'customerMessages', newValue);
  };

  const addOption3 = async () => {
    const newValue = !option3;
    setOption3(newValue);
    await handleSettingUpdate('customer', 'reviewAlerts', newValue);
  };

  const addOption4 = async () => {
    const newValue = !option4;
    setOption4(newValue);
    await handleSettingUpdate('customer', 'customerActivity', newValue);
  };

  const addOption5 = async () => {
    const newValue = !option5;
    setOption5(newValue);
    await handleSettingUpdate('admin', 'SuspeciousActivity', newValue);
  };

  const addOption6 = async () => {
    const newValue = !option6;
    setOption6(newValue);
    await handleSettingUpdate('admin', 'passwordChange', newValue);
  };

  const ToggleSkeleton = () => (
    <div className="flex gap-3">
      <div className="w-[48px] h-[24px] bg-gray-200 rounded-full animate-pulse" />
      <div>
        <div className="w-[150px] h-[20px] bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="w-[250px] h-[16px] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="ml-[280px] mt-[120px]">
        <div className="mb-8">
          <div className="w-[150px] h-[24px] bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="w-[200px] h-[20px] bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="mt-12">
          <div className="w-[180px] h-[20px] bg-gray-200 rounded mb-4 animate-pulse" />
          
          <div className="space-y-8">
            <ToggleSkeleton />
            <ToggleSkeleton />
            <ToggleSkeleton />
            <ToggleSkeleton />
          </div>

          <div className="mt-12">
            <div className="w-[160px] h-[20px] bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-8">
              <ToggleSkeleton />
              <ToggleSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" ml-[280px] mt-[120px]">
        <div>
          <p className="text-lg text-text_strong">Notification</p>
          <p className="text-base text-text_weak pt-1">
            Manage your notification
          </p>
        </div>

        <div className="mt-[48px]">
          <p className="text-base text-text_weak">Customer notifications</p>

          <section className="pt-4">
            {/* 01 */}
            <div className="mb-[32px] flex gap-3">
              {/* switch */}
              <div
                onClick={addOption}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${
                    option ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Order updates
                </h3>
                <p className="text-base text-text_weak">
                  Receive alerts for new orders, cancelled orders and refund
                </p>
              </div>
            </div>

            {/* 02 */}
            <div className="mb-[32px] flex gap-3">
              {/* switch */}
              <div
                onClick={addOption2}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option2 ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer  ${
                    option2 ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Customer messages
                </h3>
                <p className="text-base text-text_weak">
                  Alerts for direct messages or inquiries from customers
                </p>
              </div>
            </div>

            {/* 03 */}
            <div className="mb-[32px] flex gap-3">
              {/* switch */}
              <div
                onClick={addOption3}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option3 ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${
                    option3 ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Review alerts
                </h3>
                <p className="text-base text-text_weak">
                  Notifications when customers leaves reviews or feedback
                </p>
              </div>
            </div>

            {/* 04 */}
            <div className="flex gap-3">
              {/* switch */}
              <div
                onClick={addOption4}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option4 ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${
                    option4 ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Customer activity
                </h3>
                <p className="text-base text-text_weak">
                  Stay informed about new customer registrations or updates to
                  customer profiles
                </p>
              </div>
            </div>
          </section>

          <section className="pb-28 pt-[48px]">
            <h3 className="text-base text-text_strong">Admin notifications</h3>

            {/* 01 */}
            <div className="mt-[16px] mb-[32px] flex gap-3">
              {/* switch */}
              <div
                onClick={addOption5}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option5 ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${
                    option5 ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Suspicious activity
                </h3>
                <p className="text-base text-text_weak">
                  Alerts for failed logins or unusual admin activity
                </p>
              </div>
            </div>

            {/* 02 */}
            <div className="flex gap-3">
              {/* switch */}
              <div
                onClick={addOption6}
                className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${
                  option6 ? "bg-switch_on" : "bg-stroke_weak"
                }`}
              >
                <div
                  className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer  ${
                    option6 ? "ml-auto bg-success_1" : "bg-text_weaker"
                  }`}
                />
              </div>

              {/* information */}
              <div>
                <h3 className="text-base text-text_strong pb-1">
                  Password changes
                </h3>
                <p className="text-base text-text_weak">
                  Get notified of changes to admin passwords
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
