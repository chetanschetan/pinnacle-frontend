// // import React, { useEffect, useState } from 'react';
// // import Navbar from '../components/Navbar';
// // import { Clock, CheckCircle, XCircle, FilePlus, History, ArrowRight, Trash2, FileText, Image as ImageIcon, ExternalLink, MessageSquare } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import API from '../api/axios';

// // // 1. Updated FileCard to handle OBJECT instead of STRING
// // const FileCard = ({ fileObj, onDelete }: { fileObj: { path: string, status: string }, onDelete: (p: string) => void }) => {
// //   const path = fileObj.path; // Extract path from object
// //   const isPDF = path.toLowerCase().endsWith('.pdf');
// //   const url = `http://localhost:5000/${path}`;

// //   return (
// //     <div className="flex items-center justify-between p-3 bg-white border rounded-xl hover:shadow-sm transition relative overflow-hidden">
// //       {/* Small status indicator */}
// //       <div className={`absolute left-0 top-0 h-full w-1 ${fileObj.status === 'verified' ? 'bg-green-500' : 'bg-amber-400'}`} />
      
// //       <div className="flex items-center gap-3 overflow-hidden ml-1">
// //         {isPDF ? <FileText size={18} className="text-red-500" /> : <ImageIcon size={18} className="text-blue-500" />}
// //         <div className="flex flex-col truncate">
// //            <span className="text-[10px] font-bold text-slate-600 truncate">{path.split('/').pop()}</span>
// //            <span className="text-[8px] uppercase font-black text-slate-400">{fileObj.status}</span>
// //         </div>
// //       </div>
// //       <div className="flex gap-1">
// //         <a href={url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-600"><ExternalLink size={14} /></a>
// //         <button onClick={() => onDelete(path)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
// //       </div>
// //     </div>
// //   );
// // };

// // const UserDashboard: React.FC = () => {
// //   const [requests, setRequests] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [chatOpen, setChatOpen] = useState(false); // For your next step!

// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const { data } = await API.get('/consultations/my-requests');
// //         setRequests(data);
// //       } catch (err) { console.error(err); }
// //       finally { setLoading(false); }
// //     };
// //     fetchRequests();
// //   }, []);

// //   const handleDeleteDoc = async (id: string, filePath: string) => {
// //     if (!window.confirm("Delete this document?")) return;
// //     try {
// //       await API.delete(`/consultations/${id}/document`, { data: { filePath } });
// //       setRequests(prev => prev.map(r => 
// //         r._id === id 
// //         ? { ...r, documents: r.documents.filter((d: any) => d.path !== filePath) } 
// //         : r
// //       ));
// //     } catch (err) { alert("Delete failed"); }
// //   };

// //   if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading profile...</div>;

// //   const active = requests[0];

// //   return (
// //     <div className="min-h-screen bg-slate-50 pt-24 pb-20">
// //       <Navbar />
// //       <div className="max-w-5xl mx-auto px-6">
// //         <header className="mb-10 text-4xl font-black text-slate-900">Your Activity</header>
        
// //         {active ? (
// //           <div className={`p-10 rounded-[3rem] border shadow-xl flex flex-col md:flex-row gap-10 items-start ${active.status === 'accepted' ? 'bg-green-50 border-green-100' : 'bg-white'}`}>
// //             <div className="flex-1 w-full">
// //               <h2 className="text-5xl font-black capitalize mb-6 text-slate-900">{active.status}</h2>
              
// //               <div className="bg-white/80 p-6 rounded-2xl mb-6 shadow-sm">
// //                 <p className="text-xs font-black uppercase text-blue-600 mb-2">Expert Feedback</p>
// //                 <p className="text-slate-700 italic font-medium">"{active.adminComment || "Reviewing your profile..."}"</p>
// //               </div>

// //               {active.documents?.length > 0 && (
// //                 <div className="mb-8">
// //                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Submitted Documents</p>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //                     {active.documents.map((doc: any, index: number) => (
// //                       // 2. Pass the whole object and use path as the key
// //                       <FileCard key={doc.path || index} fileObj={doc} onDelete={(p) => handleDeleteDoc(active._id, p)} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {active.status === 'accepted' && (
// //                 <Link to={`/submit-docs/${active._id}`} className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition shadow-lg group">
// //                   <FilePlus size={20} />
// //                   {active.documents?.length > 0 ? "Add More Documents" : "Submit Documents"}
// //                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
// //                 </Link>
// //               )}
// //             </div>

// //             <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg text-white ${active.status === 'accepted' ? 'bg-green-500' : 'bg-amber-500'}`}>
// //               {active.status === 'accepted' ? <CheckCircle size={60} /> : <Clock size={60} />}
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 font-bold">No requests found.</div>
// //         )}
// //       </div>

// //       {/* 3. Floating Chat Button (Setup for your next step) */}
// //       <button 
// //         onClick={() => setChatOpen(true)}
// //         className="fixed bottom-10 right-10 bg-blue-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
// //       >
// //         <MessageSquare size={24} />
// //       </button>
// //     </div>
// //   );
// // };

// // export default UserDashboard;

// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Clock, CheckCircle, FilePlus, ArrowRight, Trash2, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import API from '../api/axios';
// import ChatBox from '../components/ChatBox'; // Ensure this path is correct

// // FileCard remains the same as your provided code
// const FileCard = ({ fileObj, onDelete }: { fileObj: { path: string, status: string }, onDelete: (p: string) => void }) => {
//   const path = fileObj.path;
//   const isPDF = path.toLowerCase().endsWith('.pdf');
//   const url = `http://localhost:5000/${path}`;

//   return (
//     <div className="flex items-center justify-between p-3 bg-white border rounded-xl hover:shadow-sm transition relative overflow-hidden">
//       <div className={`absolute left-0 top-0 h-full w-1 ${fileObj.status === 'verified' ? 'bg-green-500' : 'bg-amber-400'}`} />
//       <div className="flex items-center gap-3 overflow-hidden ml-1">
//         {isPDF ? <FileText size={18} className="text-red-500" /> : <ImageIcon size={18} className="text-blue-500" />}
//         <div className="flex flex-col truncate">
//            <span className="text-[10px] font-bold text-slate-600 truncate">{path.split('/').pop()}</span>
//            <span className="text-[8px] uppercase font-black text-slate-400">{fileObj.status}</span>
//         </div>
//       </div>
//       <div className="flex gap-1">
//         <a href={url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-600"><ExternalLink size={14} /></a>
//         <button onClick={() => onDelete(path)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
//       </div>
//     </div>
//   );
// };

// const UserDashboard: React.FC = () => {
//   const [requests, setRequests] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [adminId, setAdminId] = useState<string>("");
  
//   // Get user from your Auth State (adjust this to match your auth logic)
//   const user = JSON.parse(localStorage.getItem('user') || '{}'); 

//   useEffect(() => {
//     const initDashboard = async () => {
//       try {
//         // Fetch User Requests
//         const { data: requestData } = await API.get('/consultations/my-requests');
//         setRequests(requestData);

//         // Fetch Admin Info for Chat
//         const { data: adminData } = await API.get('/chat/admin-info');
//         setAdminId(adminData._id);
//       } catch (err) {
//         console.error("Dashboard Init Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     initDashboard();
//   }, []);

//   const handleDeleteDoc = async (id: string, filePath: string) => {
//     if (!window.confirm("Delete this document?")) return;
//     try {
//       await API.delete(`/consultations/${id}/document`, { data: { filePath } });
//       setRequests(prev => prev.map(r => 
//         r._id === id 
//         ? { ...r, documents: r.documents.filter((d: any) => d.path !== filePath) } 
//         : r
//       ));
//     } catch (err) { alert("Delete failed"); }
//   };

//   if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading profile...</div>;

//   const active = requests[0];

//   return (
//     <div className="min-h-screen bg-slate-50 pt-24 pb-20">
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-6">
//         <header className="mb-10 text-4xl font-black text-slate-900">Your Activity</header>
        
//         {active ? (
//           <div className={`p-10 rounded-[3rem] border shadow-xl flex flex-col md:flex-row gap-10 items-start ${active.status === 'accepted' ? 'bg-green-50 border-green-100' : 'bg-white'}`}>
//             <div className="flex-1 w-full">
//               <h2 className="text-5xl font-black capitalize mb-6 text-slate-900">{active.status}</h2>
//               <div className="bg-white/80 p-6 rounded-2xl mb-6 shadow-sm">
//                 <p className="text-xs font-black uppercase text-blue-600 mb-2">Expert Feedback</p>
//                 <p className="text-slate-700 italic font-medium">"{active.adminComment || "Reviewing your profile..."}"</p>
//               </div>

//               {active.documents?.length > 0 && (
//                 <div className="mb-8">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Submitted Documents</p>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {active.documents.map((doc: any, index: number) => (
//                       <FileCard key={doc.path || index} fileObj={doc} onDelete={(p) => handleDeleteDoc(active._id, p)} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {active.status === 'accepted' && (
//                 <Link to={`/submit-docs/${active._id}`} className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition shadow-lg group">
//                   <FilePlus size={20} />
//                   {active.documents?.length > 0 ? "Add More Documents" : "Submit Documents"}
//                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </Link>
//               )}
//             </div>

//             <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg text-white ${active.status === 'accepted' ? 'bg-green-500' : 'bg-amber-500'}`}>
//               {active.status === 'accepted' ? <CheckCircle size={60} /> : <Clock size={60} />}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 font-bold">No requests found.</div>
//         )}
//       </div>

//       {/* FIXED CHAT INTEGRATION */}
//       {adminId && (
//         <ChatBox 
//           currentUser={user} 
//           receiverId={adminId} 
//           receiverName="Pinnacle Support" 
//         />
//       )}
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Clock, CheckCircle, FilePlus, ArrowRight, Trash2, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import ChatBox from '../components/ChatBox';

// --- FILE CARD COMPONENT ---
const FileCard = ({ fileObj, onDelete }: { fileObj: { path: string, status: string }, onDelete: (p: string) => void }) => {
  const path = fileObj.path;
  const isPDF = path.toLowerCase().endsWith('.pdf');
  const url = `http://localhost:5000/${path}`;

  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-xl hover:shadow-sm transition relative overflow-hidden">
      <div className={`absolute left-0 top-0 h-full w-1 ${fileObj.status === 'verified' ? 'bg-green-500' : 'bg-amber-400'}`} />
      <div className="flex items-center gap-3 overflow-hidden ml-1">
        {isPDF ? <FileText size={18} className="text-red-500" /> : <ImageIcon size={18} className="text-blue-500" />}
        <div className="flex flex-col truncate">
           <span className="text-[10px] font-bold text-slate-600 truncate">{path.split('/').pop()}</span>
           <span className="text-[8px] uppercase font-black text-slate-400">{fileObj.status}</span>
        </div>
      </div>
      <div className="flex gap-1">
        <a href={url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-600"><ExternalLink size={14} /></a>
        <button onClick={() => onDelete(path)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const UserDashboard: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminId, setAdminId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
  const initDashboard = async () => {
    try {
      // 1. FIX: Grab from 'userInfo' as seen in your Application tab
      const savedData = localStorage.getItem('userInfo');
      const storedUser = JSON.parse(savedData || 'null');
      
      if (storedUser && storedUser._id) {
        // We set the user state - this will trigger the ChatBox to appear
        setCurrentUser(storedUser);
        console.log("✅ ChatBox unlocked for:", storedUser.fullName);
      } else {
        console.warn("⚠️ userInfo is missing or empty in LocalStorage.");
      }

      // 2. Fetch requests and adminId (Keep your existing logic here)
      const { data: requestData } = await API.get('/consultations/my-requests');
      setRequests(requestData);

      const { data: adminData } = await API.get('/chat/admin-info');
      if (adminData?._id) setAdminId(adminData._id);

    } catch (err) {
      console.error("Dashboard Init Error:", err);
    } finally {
      setLoading(false);
    }
  };
  initDashboard();
}, []);

  const handleDeleteDoc = async (id: string, filePath: string) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await API.delete(`/consultations/${id}/document`, { data: { filePath } });
      setRequests(prev => prev.map(r => 
        r._id === id 
        ? { ...r, documents: r.documents.filter((d: any) => d.path !== filePath) } 
        : r
      ));
    } catch (err) { 
      alert("Delete failed"); 
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900 mb-4"></div>
        <p className="font-bold text-slate-400">Loading your Pinnacle profile...</p>
      </div>
    );
  }

  const active = requests[0];

  console.log("🔍 CHAT VISIBILITY CHECK:", { 
  hasUser: !!currentUser, 
  userId: currentUser?._id, 
  hasAdminId: !!adminId,
  adminId: adminId
});

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-4xl font-black text-slate-900">Your Activity</header>
        
        {active ? (
          <div className={`p-10 rounded-[3rem] border shadow-xl flex flex-col md:flex-row gap-10 items-start ${active.status === 'accepted' ? 'bg-green-50 border-green-100' : 'bg-white'}`}>
            <div className="flex-1 w-full">
              <h2 className="text-5xl font-black capitalize mb-6 text-slate-900">{active.status}</h2>
              
              <div className="bg-white/80 p-6 rounded-2xl mb-6 shadow-sm">
                <p className="text-xs font-black uppercase text-blue-600 mb-2">Expert Feedback</p>
                <p className="text-slate-700 italic font-medium">
                    "{active.adminComment || "Our team is currently reviewing your profile. We will update you shortly."}"
                </p>
              </div>

              {active.documents?.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Submitted Documents</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.documents.map((doc: any, index: number) => (
                      <FileCard 
                        key={doc.path || index} 
                        fileObj={doc} 
                        onDelete={(p) => handleDeleteDoc(active._id, p)} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {active.status === 'accepted' && (
                <Link 
                    to={`/submit-docs/${active._id}`} 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition shadow-lg group"
                >
                  <FilePlus size={20} />
                  {active.documents?.length > 0 ? "Add More Documents" : "Submit Documents"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg text-white ${active.status === 'accepted' ? 'bg-green-500' : 'bg-amber-500'}`}>
              {active.status === 'accepted' ? <CheckCircle size={60} /> : <Clock size={60} />}
            </div>
          </div>
        ) : (
          <div className="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 font-bold">
            No active consultation requests found.
          </div>
        )}
      </div>

      {/* --- REAL-TIME CHAT INTEGRATION --- */}
      {/* This only mounts once BOTH currentUserId and adminId are ready.
          This is the final fix for the 'Offline' socket error.
      */}
      {currentUser?._id && adminId && (
        <ChatBox 
          currentUser={currentUser} 
          receiverId={adminId} 
          receiverName="Pinnacle Support" 
        />
      )}
    </div>
  );
};

export default UserDashboard;