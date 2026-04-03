import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyProps {
  title: string;
  desc: string;
  Icon: LucideIcon;
  action?: () => void;
  actionLabel?: string;
}

const EmptyState: React.FC<EmptyProps> = ({ title, desc, Icon, action, actionLabel }) => (
  <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-sm animate-fade-in">
    <div className="bg-slate-50 p-6 rounded-3xl mb-6 text-slate-300">
      <Icon size={48} />
    </div>
    <h3 className="text-2xl font-black text-slate-900">{title}</h3>
    <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium">{desc}</p>
    {action && (
      <button 
        onClick={action} 
        className="mt-8 px-8 py-3 bg-blue-900 text-white rounded-2xl font-black hover:scale-105 transition-transform shadow-lg shadow-blue-900/20"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;