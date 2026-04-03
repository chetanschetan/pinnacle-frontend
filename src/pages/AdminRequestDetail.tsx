// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { ArrowLeft, CheckCircle2, XCircle, Trash2, Phone, Mail, Briefcase, IndianRupee, PieChart } from 'lucide-react'; 
// import API from '../api/axios';
// import ChatBox from '../components/ChatBox';

// const AdminRequestDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [request, setRequest] = useState<any>(null);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const { data } = await API.get(`/consultations/admin/request/${id}`);
//         setRequest(data);
//       } catch (err) { console.error(err); }
//     };
//     fetchDetail();
//   }, [id]);

//   const handleAction = async (status: string) => {
//     const comment = prompt(`Enter reason for ${status}:`);
//     try {
//       await API.put(`/consultations/admin/update/${id}`, { status, adminComment: comment });
//       navigate(-1); 
//     } catch (err) { alert("Update failed"); }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Delete this request? This cannot be undone.")) {
//       try {
//         await API.delete(`/consultations/admin/delete/${id}`);
//         navigate('/admin-dashboard');
//       } catch (err) { alert("Deletion failed."); }
//     }
//   };

//   if (!request) return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 pt-24 pb-20">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-6">
//         <div className="flex justify-between items-center mb-8">
//           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-900 transition">
//             <ArrowLeft size={20} /> Back
//           </button>
          
//           <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition">
//             <Trash2 size={20} /> Delete Case
//           </button>
//         </div>

//         <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
//           {/* Header */}
//           <div className="bg-slate-900 p-12 text-white">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Consultation Detail</h2>
//                 <h1 className="text-4xl font-black">{request.answers?.name || request.user?.fullName}</h1>
//               </div>
//               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
//                 request.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
//                 request.status === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
//                 'bg-blue-500/10 text-blue-400 border-blue-500/20'
//               }`}>
//                 {request.status}
//               </span>
//             </div>
//             <div className="flex flex-wrap gap-6 mt-6 text-slate-400">
//               <div className="flex items-center gap-2 text-sm"><Mail size={16}/> {request.answers?.email || request.user?.email}</div>
//               <div className="flex items-center gap-2 text-sm"><Phone size={16}/> {request.answers?.phone}</div>
//             </div>
//           </div>

//           <div className="p-12 space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Requested Service */}
//               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
//                 <div className="flex items-center gap-2 mb-2 text-blue-600">
//                   <Briefcase size={16} />
//                   <p className="text-[10px] font-black uppercase tracking-widest">Requested Service</p>
//                 </div>
//                 <p className="text-lg font-bold text-slate-900">{request.answers?.service || 'Not provided'}</p>
//               </div>

//               {/* Requirement Type */}
//               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Requirement For</p>
//                 <p className="text-lg font-bold text-slate-900">{request.answers?.requirementType || 'Not provided'}</p>
//               </div>

//               {/* Annual Income */}
//               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
//                 <div className="flex items-center gap-2 mb-2 text-green-600">
//                   <IndianRupee size={16} />
//                   <p className="text-[10px] font-black uppercase tracking-widest">Annual Income</p>
//                 </div>
//                 <p className="text-lg font-bold text-slate-900">{request.answers?.incomeRange || 'Not provided'}</p>
//               </div>

//               {/* Primary Income Sources */}
//               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
//                 <div className="flex items-center gap-2 mb-2 text-purple-600">
//                   <PieChart size={16} />
//                   <p className="text-[10px] font-black uppercase tracking-widest">Primary Income Sources</p>
//                 </div>
//                 <p className="text-lg font-bold text-slate-900">
//                   {request.answers?.incomeSources?.length > 0 
//                     ? request.answers.incomeSources.join(', ') 
//                     : 'Not specified'}
//                 </p>
//               </div>
//             </div>

//             {/* Status Update Buttons */}
//             <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4">
//               <button onClick={() => handleAction('accepted')} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition">
//                 <CheckCircle2 size={22} /> Accept Request
//               </button>
//               <button onClick={() => handleAction('rejected')} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition">
//                 <XCircle size={22} /> Reject Request
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminRequestDetail;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowLeft, CheckCircle2, XCircle, Trash2, Phone, Mail, Briefcase, IndianRupee, PieChart } from 'lucide-react'; 
import API from '../api/axios';
import ChatBox from '../components/ChatBox'; // 1. IMPORT CHATBOX

const AdminRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<any>(null);
  
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    // 1. FIX: Grab admin info from 'userInfo' just like the UserDashboard
    const savedAdmin = localStorage.getItem('userInfo');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }

    const fetchDetail = async () => {
      try {
        const { data } = await API.get(`/consultations/admin/request/${id}`);
        setRequest(data);
      } catch (err) { 
        console.error("Fetch Error:", err); 
      }
    };
    fetchDetail();
  }, [id]);

  const handleAction = async (status: string) => {
    const comment = prompt(`Enter reason for ${status}:`);
    if (comment === null) return; // Handle cancel
    try {
      await API.put(`/consultations/admin/update/${id}`, { status, adminComment: comment });
      navigate(-1); 
    } catch (err) { alert("Update failed"); }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this request? This cannot be undone.")) {
      try {
        await API.delete(`/consultations/admin/delete/${id}`);
        navigate('/admin-dashboard');
      } catch (err) { alert("Deletion failed."); }
    }
  };

  if (!request) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-900 transition">
            <ArrowLeft size={20} /> Back
          </button>
          
          <button onClick={handleDelete} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition">
            <Trash2 size={20} /> Delete Case
          </button>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-12 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Consultation Detail</h2>
                <h1 className="text-4xl font-black">{request.answers?.name || request.user?.fullName}</h1>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                request.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                request.status === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {request.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 text-slate-400">
              <div className="flex items-center gap-2 text-sm"><Mail size={16}/> {request.answers?.email || request.user?.email}</div>
              <div className="flex items-center gap-2 text-sm"><Phone size={16}/> {request.answers?.phone}</div>
            </div>
          </div>

          <div className="p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <Briefcase size={16} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Requested Service</p>
                </div>
                <p className="text-lg font-bold text-slate-900">{request.answers?.service || 'Not provided'}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Requirement For</p>
                <p className="text-lg font-bold text-slate-900">{request.answers?.requirementType || 'Not provided'}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-green-600">
                  <IndianRupee size={16} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Annual Income</p>
                </div>
                <p className="text-lg font-bold text-slate-900">{request.answers?.incomeRange || 'Not provided'}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-purple-600">
                  <PieChart size={16} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Primary Income Sources</p>
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {request.answers?.incomeSources?.length > 0 
                    ? request.answers.incomeSources.join(', ') 
                    : 'Not specified'}
                </p>
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <button onClick={() => handleAction('accepted')} className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition">
                <CheckCircle2 size={22} /> Accept Request
              </button>
              <button onClick={() => handleAction('rejected')} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-red-700 transition">
                <XCircle size={22} /> Reject Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RENDER THE CHATBOX FOR ADMIN */}
      {/* - currentUser is the Admin
          - receiverId is the User who made the request (request.user._id)
          - receiverName is the User's name
      */}

      {console.log("🛠️ Admin Chat Guard:", { 
        hasAdmin: !!admin, 
        adminId: admin?._id, 
        hasRequestUser: !!request.user?._id 
      })}

      {request.user?._id && (
        <ChatBox 
          currentUser={admin} 
          receiverId={request.user._id} 
          receiverName={request.answers?.name || request.user?.fullName} 
        />
      )}
    </div>
  );
};

export default AdminRequestDetail;