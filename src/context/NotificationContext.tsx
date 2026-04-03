import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextType {
  showToast: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string, type: NotificationType } | null>(null);

  const showToast = (message: string, type: NotificationType = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Auto-hide after 4 seconds
  };

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed bottom-10 right-10 z-[100] flex items-center gap-3 p-5 rounded-2xl shadow-2xl border animate-slide-in ${
          toast.type === 'success' ? 'bg-green-600 border-green-500 text-white' : 'bg-red-600 border-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-bold text-sm">{toast.message}</span>
          <button onClick={() => setToast(null)}><X size={16} /></button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};