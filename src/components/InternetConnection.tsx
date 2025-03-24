'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const InternetConnection = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        toast.success('Connection restored!');
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[999] flex items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-2">No Internet Connection</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    </div>
  );
};

export default InternetConnection;
