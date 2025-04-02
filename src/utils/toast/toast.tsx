/* eslint-disable @typescript-eslint/no-explicit-any */

import toast from 'react-hot-toast';

export const showSuccessToast = (message:any) => {
  toast.success(message, {
    duration: 1500,
    // position: 'top-right',
    // style: {
    //   border: '1px solid #4BB543',
    //   padding: '16px',
    //   color: '#4BB543',
    //   background: '#f8f9fa'
    // },
  });
};

export const showErrorToast = (message:any) => {
  toast.error(message, {
    duration: 1500,
    // position: 'top-right',
    // style: {
    //   border: '1px solid #ff0033',
    //   padding: '16px',
    //   color: '#ff0033',
    //   background: '#f8f9fa'
    // },
  });
};

export const showInfoToast = (message:any) => {
  toast(message, {
    duration: 1500,
    // position: 'top-right',
    // style: {
    //   border: '1px solid #ff0033',
    //   padding: '16px',
    //   color: '#ff0033',
    //   background: '#f8f9fa'
    // },
  });
};


// Simplified toast functions
export const successToast = (message: any) => showSuccessToast(message);
export const errorToast = (message: any) => showErrorToast(message);
export const infoToast = (message: any) => showInfoToast(message);



/* eslint-disable @typescript-eslint/no-explicit-any */
