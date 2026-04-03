import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { FileDown, UserCheck } from 'lucide-react';

const AdminDocs = () => {
  const [acceptedClients, setAcceptedClients] = useState([]);

  useEffect(() => {
    const fetchAccepted = async () => {
      // Fetch consultations where status is 'accepted'
      const { data } = await API.get('/consultations/admin/accepted-clients');
      setAcceptedClients(data);
    };
    fetchAccepted();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-green-600 p-3 rounded-2xl shadow-lg"><UserCheck className="text-white"/></div>
          <h1 className="text-4xl font-black text-slate-900">Accepted Clients Vault</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {acceptedClients.map((client: any) => (
            <div key={client._id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-black text-slate-900">{client.user?.fullName}</h3>
              <p className="text-sm text-slate-400 mb-6">{client.user?.email}</p>
              
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400">Uploaded Documents</p>
                {/* Assuming 'client.documents' is an array of file links */}
                {client.documents?.map((doc: string, i: number) => (
                  <a 
                    key={i} 
                    href={`http://localhost:5000/${doc}`} 
                    target="_blank" 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition border border-slate-100"
                  >
                    <span className="text-xs font-bold text-slate-600">Document_{i+1}.pdf</span>
                    <FileDown size={16} className="text-blue-900" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};