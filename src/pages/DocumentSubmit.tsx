import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle, FileText, FilePlus, LayoutDashboard, ArrowRight } from 'lucide-react';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const DocumentSubmit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('documents', file));

    setLoading(true);
    setError(null);
    try {
      await API.post(`/consultations/upload-docs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitted(true); // Switch to success view
      setSelectedFiles([]); // Clear files for next potential upload
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS VIEW ---
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <Navbar />
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-slate-100">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-2">Upload Success!</h2>
          <p className="text-slate-500 mb-10 font-medium">Your documents have been securely sent to our team.</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => setSubmitted(false)}
              className="w-full flex items-center justify-center gap-2 p-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-blue-50 hover:text-blue-700 transition-all group"
            >
              <FilePlus size={20} />
              Submit More Documents
            </button>

            <button 
              onClick={() => navigate('/userdashboard')}
              className="w-full flex items-center justify-center gap-2 p-4 bg-blue-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-900/20"
            >
              <LayoutDashboard size={20} />
              Return to Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <Navbar />
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
              <Upload className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900">Upload Documents</h1>
            <p className="text-slate-500 font-medium mt-2">Submit your images or PDF files for review.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm bg-red-50 text-red-700">
              <AlertCircle size={20}/>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:border-blue-400 transition cursor-pointer relative">
              <input 
                type="file" 
                multiple 
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileText className="mx-auto text-slate-300 mb-2" size={40} />
              <p className="text-sm font-bold text-slate-600">
                {selectedFiles.length > 0 
                  ? `${selectedFiles.length} files selected` 
                  : "Click or Drag files here to upload"}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">JPG, PNG, PDF only (Max 5MB)</p>
            </div>

            <button
              type="submit"
              disabled={loading || selectedFiles.length === 0}
              className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-blue-900/20"
            >
              {loading ? "UPLOADING..." : "SUBMIT DOCUMENTS"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentSubmit;