import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, FileText } from 'lucide-react';
import API from '../api/axios';

const SubmitDocs = () => {
  const { id } = useParams(); // Consultation ID
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('documents', files[i]);
    }
    formData.append('consultationId', id!);

    try {
      setUploading(true);
      await API.post('/documents/upload', formData);
      alert("Documents uploaded successfully!");
      navigate('/userdashboard');
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-12 border border-slate-100">
        <div className="text-center mb-10">
          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload className="text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Document Vault</h1>
          <p className="text-slate-500 mt-2">Upload your PAN, GST, and Bank statements.</p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-10 text-center hover:border-blue-900/20 transition-colors">
            <input 
              type="file" 
              multiple 
              onChange={(e) => setFiles(e.target.files)}
              className="hidden" 
              id="file-upload" 
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="mx-auto text-slate-300 mb-4" size={48} />
              <span className="text-blue-900 font-black">Click to select files</span>
              <p className="text-xs text-slate-400 mt-2">PDF, JPG, or PNG up to 10MB</p>
            </label>
            {files && <p className="mt-4 text-sm font-bold text-green-600">{files.length} files selected</p>}
          </div>

          <button 
            disabled={uploading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-900 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Complete Submission"}
          </button>
        </form>
      </div>
    </div>
  );
};