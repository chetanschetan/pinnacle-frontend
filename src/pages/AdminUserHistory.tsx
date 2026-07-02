import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, ExternalLink, Calendar, Briefcase, FileText, AlertCircle } from 'lucide-react';
import API from '../api/axios';

const AdminUserHistory = () => {
  const { userId } = useParams();
  const [requests, setRequests] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const { data } = await API.get('/consultations/admin/all');
        const userSpecific = data
          .filter((r: any) => r.user?._id === userId)
          .sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setRequests(userSpecific);
      } catch (err) { console.error(err); }
    };
    fetchUserRequests();
  }, [userId]);

  const clientName = requests[0]?.user?.fullName || "Client";

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <button onClick={() => navigate('/admin-dashboard')} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-blue-900 transition">
          <ArrowLeft size={20} /> Back to Directory
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">{clientName}'s Requests</h1>
          <p className="text-slate-500 font-medium">Review history and update status for this client.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="p-8">Date</th>
                <th className="p-8">Requested Service</th>
                <th className="p-8">Status</th>
                {/* NEW HEADER */}
                <th className="p-8 text-center">Verification Docs</th>
                <th className="p-8 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-blue-50/20 transition">
                  <td className="p-8 font-bold text-slate-900 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  
                  <td className="p-8 text-slate-900 font-bold">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-blue-600" />
                      {req.answers?.service || "General Consulting"}
                    </div>
                  </td>

                  <td className="p-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      req.status === 'rejected' 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : req.status === 'accepted' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {req.status}
                    </span>
                  </td>

                  {/* NEW COLUMN: DOCUMENT BUTTON OR MESSAGE */}
                  <td className="p-8 text-center">
                    {req.documents && req.documents.length > 0 ? (
                      <button 
                        onClick={() => navigate('/admin/vault')}
                        className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-wider group"
                      >
                        <FileText size={14} className="group-hover:scale-110 transition" />
                        View {req.documents.length} Files
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-slate-300 font-bold italic text-xs">
                        <AlertCircle size={12} />
                        Not submitted yet
                      </div>
                    )}
                  </td>

                  <td className="p-8 text-right">
                    <button 
                      onClick={() => navigate(`/admin/request/${req._id}`)}
                      className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-900 transition shadow-lg shadow-slate-900/10"
                    >
                       <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserHistory;
