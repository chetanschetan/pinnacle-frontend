import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { User, Search, ChevronRight, Mail, Hash, Users, Briefcase, FileWarning, FolderOpen } from 'lucide-react'; 
import API from '../api/axios';

// --- SUB-COMPONENT: ANALYTICS STATS ---
const StatsHeader = ({ data }: { data: any[] }) => {
  const stats = {
    total: data.length,
    pending: data.filter(u => u.latestStatus === 'pending').length,
    accepted: data.filter(u => u.latestStatus === 'accepted').length,
    withDocs: data.filter(u => u.hasUnreviewedDocs).length
  };

  const cards = [
    { label: 'Total Clients', value: stats.total, color: 'bg-slate-900', text: 'text-white' },
    { label: 'Pending Review', value: stats.pending, color: 'bg-amber-500', text: 'text-white' },
    { label: 'Approved', value: stats.accepted, color: 'bg-green-600', text: 'text-white' },
    { label: 'New Documents', value: stats.withDocs, color: 'bg-blue-600', text: 'text-white' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {cards.map((s, i) => (
        <div key={i} className={`${s.color} p-6 rounded-[2rem] shadow-lg transition-transform hover:scale-[1.02]`}>
          <p className={`text-[10px] font-black uppercase tracking-widest opacity-70 mb-1 ${s.text}`}>{s.label}</p>
          <p className={`text-3xl font-black ${s.text}`}>{s.value}</p>
        </div>
      ))}
    </div>
  );
};

// --- SUB-COMPONENT: EMPTY STATE ---
const EmptyState = ({ searchTerm, clearSearch }: { searchTerm: string, clearSearch: () => void }) => (
  <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200 shadow-sm">
    <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
      <Users size={40} className="text-slate-300" />
    </div>
    <h2 className="text-2xl font-black text-slate-900 mb-2">No Clients Found</h2>
    <p className="text-slate-500 max-w-xs mx-auto">
      {searchTerm 
        ? `We couldn't find any results for "${searchTerm}"` 
        : "Your directory is currently empty. New onboarding requests will appear here."}
    </p>
    {searchTerm && (
      <button onClick={clearSearch} className="mt-6 text-blue-600 font-bold hover:underline uppercase text-xs tracking-widest">
        Clear Search
      </button>
    )}
  </div>
);

const AdminDashboard = () => {
  const [groupedUsers, setGroupedUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndGroup = async () => {
      try {
        const { data } = await API.get('/consultations/admin/all');
        
        const groups = data.reduce((acc: any, req: any) => {
          const userId = req.user?._id;
          if (!userId) return acc;

          if (!acc[userId]) {
            acc[userId] = {
              userInfo: req.user,
              requestCount: 0,
              latestService: req.answers?.service || 'General Inquiry',
              latestStatus: req.status,
              lastActivity: new Date(req.createdAt).getTime(),
              hasUnreviewedDocs: false 
            };
          }
          
          acc[userId].requestCount += 1;
          if (req.documents && req.documents.length > 0) acc[userId].hasUnreviewedDocs = true;

          const currentReqTime = new Date(req.createdAt).getTime();
          if (currentReqTime > acc[userId].lastActivity) {
            acc[userId].latestStatus = req.status;
            acc[userId].latestService = req.answers?.service;
            acc[userId].lastActivity = currentReqTime;
          }
          return acc;
        }, {});

        const finalSortedArray = Object.values(groups).sort((a: any, b: any) => b.lastActivity - a.lastActivity);
        setGroupedUsers(finalSortedArray);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndGroup();
  }, []);

  const filteredUsers = groupedUsers.filter(u => 
    u.userInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.userInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Management Console</h1>
            <p className="text-slate-500 font-medium">Real-time overview of Pinnacle financial clients.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              placeholder="Search by name or email..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
           <div className="text-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
             <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Syncing Data...</p>
           </div>
        ) : (
          <>
            {/* ANALYTICS STATS SECTION */}
            <StatsHeader data={groupedUsers} />

            {/* CLIENT GRID OR EMPTY STATE */}
            {filteredUsers.length === 0 ? (
              <EmptyState searchTerm={searchTerm} clearSearch={() => setSearchTerm('')} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((client) => (
                  <div 
                    key={client.userInfo._id}
                    onClick={() => navigate(`/admin/client/${client.userInfo._id}`)}
                    className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer border border-slate-100 relative overflow-hidden"
                  >
                    {/* Status accent bar */}
                    <div className={`absolute top-0 left-0 h-full w-1.5 ${
                      client.latestStatus === 'accepted' ? 'bg-green-500' : 
                      client.latestStatus === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />

                    {client.hasUnreviewedDocs && (
                      <div className="absolute top-6 right-6 flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                        <FolderOpen size={12} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase">Docs Available</span>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-slate-100 p-4 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <User size={24} />
                      </div>
                      <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-tighter">
                        {client.requestCount} Requests
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {client.userInfo.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1 mb-6">
                      <Mail size={14} /> {client.userInfo.email}
                    </div>

                    <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase text-slate-400">Current Interest</span>
                        <span className="text-xs font-bold text-slate-700 truncate max-w-[150px] italic">
                          {client.latestService}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
