import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center animate-in zoom-in duration-300">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 mb-2">Account Created!</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Welcome to Pinnacle. Your professional profile is ready. Let's customize your experience.
        </p>
        
        <button 
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 bg-blue-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-900/20"
        >
          Start Onboarding <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;