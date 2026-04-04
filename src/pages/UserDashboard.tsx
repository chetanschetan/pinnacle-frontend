// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Clock, CheckCircle, FilePlus, ArrowRight, Trash2, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import API from '../api/axios';
// import ChatBox from '../components/ChatBox';

// // --- FILE CARD COMPONENT ---
// const FileCard = ({ fileObj, onDelete }: { fileObj: { path: string, status: string }, onDelete: (p: string) => void }) => {
//   const path = fileObj.path;
//   const isPDF = path.toLowerCase().endsWith('.pdf');
  
//   // FIX: Points to your live Render backend instead of localhost
//   const url = `https://pinnacle-backend-1-qyyx.onrender.com/${path}`;

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
//         <a href={url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-600">
//           <ExternalLink size={14} />
//         </a>
//         <button onClick={() => onDelete(path)} className="p-1.5 text-slate-400 hover:text-red-600">
//           <Trash2 size={14} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- MAIN DASHBOARD COMPONENT ---
// const UserDashboard: React.FC = () => {
//   const [requests, setRequests] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [adminId, setAdminId] = useState<string>("");
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const initDashboard = async () => {
//       try {
//         // 1. Get User Info from LocalStorage
//         const savedData = localStorage.getItem('userInfo');
//         const storedUser = JSON.parse(savedData || 'null');
        
//         if (storedUser && storedUser._id) {
//           setCurrentUser(storedUser);
//         }

//         // 2. Fetch ALL requests (Sorted by backend newest first)
//         const { data: requestData } = await API.get('/consultations/my-requests');
//         setRequests(requestData);

//         // 3. Get Admin Info for Chat
//         const { data: adminData } = await API.get('/chat/admin-info');
//         if (adminData?._id) setAdminId(adminData._id);

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
//     } catch (err) { 
//       alert("Delete failed"); 
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900 mb-4"></div>
//         <p className="font-bold text-slate-400">Loading your Pinnacle profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 pt-24 pb-20">
//       <Navbar />
      
//       <div className="max-w-5xl mx-auto px-6">
//         <header className="mb-10 text-4xl font-black text-slate-900">Your Activity</header>
        
//         {/* FIX: Now mapping through ALL requests instead of just showing requests[0] */}
//         <div className="space-y-10">
//           {requests.length > 0 ? (
//             requests.map((request: any) => (
//               <div 
//                 key={request._id} 
//                 className={`p-10 rounded-[3rem] border shadow-xl flex flex-col md:flex-row gap-10 items-start transition-all hover:shadow-2xl ${
//                   request.status === 'accepted' ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100'
//                 }`}
//               >
//                 <div className="flex-1 w-full">
//                   <div className="flex justify-between items-start mb-4">
//                     <h2 className="text-5xl font-black capitalize text-slate-900">{request.status}</h2>
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-3 py-1 rounded-full">
//                       ID: {request._id.slice(-6)}
//                     </span>
//                   </div>
                  
//                   <div className="bg-white/80 p-6 rounded-2xl mb-6 shadow-sm border border-slate-50">
//                     <p className="text-xs font-black uppercase text-blue-600 mb-2">Expert Feedback</p>
//                     <p className="text-slate-700 italic font-medium">
//                         "{request.adminComment || "Our team is currently reviewing your profile. We will update you shortly."}"
//                     </p>
//                   </div>

//                   {request.documents?.length > 0 && (
//                     <div className="mb-8">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Submitted Documents</p>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {request.documents.map((doc: any, index: number) => (
//                           <FileCard 
//                             key={doc.path || index} 
//                             fileObj={doc} 
//                             onDelete={(p) => handleDeleteDoc(request._id, p)} 
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {request.status === 'accepted' && (
//                     <Link 
//                         to={`/submit-docs/${request._id}`} 
//                         className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition shadow-lg group"
//                     >
//                       <FilePlus size={20} />
//                       {request.documents?.length > 0 ? "Add More Documents" : "Submit Documents"}
//                       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                   )}
//                 </div>

//                 <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg text-white shrink-0 ${
//                   request.status === 'accepted' ? 'bg-green-500' : 'bg-amber-500'
//                 }`}>
//                   {request.status === 'accepted' ? <CheckCircle size={60} /> : <Clock size={60} />}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 font-bold">
//               No active consultation requests found.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- REAL-TIME CHAT INTEGRATION --- */}
//       {currentUser?._id && adminId && (
//         <ChatBox 
//           currentUser={currentUser} 
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

// --- FILE CARD COMPONENT (FIXED WITH DATA GUARDS) ---
const FileCard = ({ fileObj, onDelete }: { fileObj: any, onDelete: (p: string) => void }) => {
  // 1. SAFE PATH EXTRACTION: Handles both {path: '...'} and 'path/to/file' strings
  const path = typeof fileObj === 'string' ? fileObj : fileObj?.path;
  
  // 2. CRASH PROTECTION: If path is missing or not a string, don't run .toLowerCase()
  if (!path || typeof path !== 'string') {
    return null; 
  }

  const isPDF = path.toLowerCase().endsWith('.pdf');
  const url = `https://pinnacle-backend-1-qyyx.onrender.com/${path.replace(/\\/g, '/')}`;

  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-xl hover:shadow-sm transition relative overflow-hidden">
      {/* STATUS BAR: Green if verified, Amber otherwise */}
      <div className={`absolute left-0 top-0 h-full w-1 ${fileObj?.status === 'verified' ? 'bg-green-500' : 'bg-amber-400'}`} />
      
      <div className="flex items-center gap-3 overflow-hidden ml-1">
        {isPDF ? <FileText size={18} className="text-red-500" /> : <ImageIcon size={18} className="text-blue-500" />}
        <div className="flex flex-col truncate">
           <span className="text-[10px] font-bold text-slate-600 truncate">
             {path.split('/').pop() || "Document"}
           </span>
           <span className="text-[8px] uppercase font-black text-slate-400">
             {fileObj?.status || 'pending'}
           </span>
        </div>
      </div>

      <div className="flex gap-1">
        <a href={url} target="_blank" rel="noreferrer" className="p-1.5 text-slate-400 hover:text-blue-600">
          <ExternalLink size={14} />
        </a>
        <button onClick={() => onDelete(path)} className="p-1.5 text-slate-400 hover:text-red-600">
          <Trash2 size={14} />
        </button>
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
        const savedData = localStorage.getItem('userInfo');
        const storedUser = JSON.parse(savedData || 'null');
        
        if (storedUser && storedUser._id) {
          setCurrentUser(storedUser);
        }

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
  

  const handleDeleteDoc = async (consultationId: string, filePath: string) => {
  if (!window.confirm("Delete this document?")) return;
  
  try {
    // 1. Wait for server confirmation
    const { data } = await API.delete(`/consultations/${consultationId}/document`, { 
      data: { filePath } 
    });

    // 2. Update UI using the document list returned by the Backend
    setRequests(prev => prev.map(r => 
      r._id === consultationId 
        ? { ...r, documents: data.documents } // <--- Sync directly with DB result
        : r
    ));
    
    console.log("✅ Deleted from DB and UI");
  } catch (err) { 
    console.error("Delete failed", err);
    alert("Delete failed. Are you still logged in?"); 
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

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-10 text-4xl font-black text-slate-900">Your Activity</header>
        
        <div className="space-y-10">
          {requests.length > 0 ? (
            requests.map((request: any) => (
              <div 
                key={request._id} 
                className={`p-10 rounded-[3rem] border shadow-xl flex flex-col md:flex-row gap-10 items-start transition-all hover:shadow-2xl ${
                  request.status === 'accepted' ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-5xl font-black capitalize text-slate-900">{request.status}</h2>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-3 py-1 rounded-full">
                      ID: {request._id.slice(-6)}
                    </span>
                  </div>
                  
                  <div className="bg-white/80 p-6 rounded-2xl mb-6 shadow-sm border border-slate-50">
                    <p className="text-xs font-black uppercase text-blue-600 mb-2">Expert Feedback</p>
                    <p className="text-slate-700 italic font-medium">
                        "{request.adminComment || "Our team is currently reviewing your profile. We will update you shortly."}"
                    </p>
                  </div>

                  {request.documents?.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Submitted Documents</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {request.documents.map((doc: any, index: number) => (
                          <FileCard 
                            key={index} 
                            fileObj={doc} 
                            onDelete={(path) => handleDeleteDoc(request._id, path)} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {request.status === 'accepted' && (
                    <Link 
                        to={`/submit-docs/${request._id}`} 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition shadow-lg group"
                    >
                      <FilePlus size={20} />
                      {request.documents?.length > 0 ? "Add More Documents" : "Submit Documents"}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>

                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center shadow-lg text-white shrink-0 ${
                  request.status === 'accepted' ? 'bg-green-500' : 'bg-amber-500'
                }`}>
                  {request.status === 'accepted' ? <CheckCircle size={60} /> : <Clock size={60} />}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-20 bg-white border-2 border-dashed rounded-[3rem] text-slate-400 font-bold">
              No active consultation requests found.
            </div>
          )}
        </div>
      </div>

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