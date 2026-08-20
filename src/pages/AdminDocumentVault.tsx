// import React, { useEffect, useState } from 'react';
// import API from '../api/axios';
// import Navbar from '../components/Navbar';
// import { FileText, User, ExternalLink, Image as ImageIcon, FolderOpen } from 'lucide-react';

// const AdminDocumentVault = () => {
//   const [vaultItems, setVaultItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVault = async () => {
//       try {
//         const { data } = await API.get('/consultations/admin/all');
//         // Filter for requests that actually have a documents array with content
//         const withDocs = data.filter((req: any) => req.documents && req.documents.length > 0);
//         setVaultItems(withDocs);
//       } catch (err) { 
//         console.error(err); 
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVault();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-50 pt-24 pb-20">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="mb-10">
//           <h1 className="text-4xl font-black text-slate-900">Document Vault</h1>
//           <p className="text-slate-500 font-medium">Review identity and tax verification files.</p>
//         </div>

//         {loading ? (
//           <div className="text-center py-20 font-bold text-slate-400">Accessing Vault...</div>
//         ) : vaultItems.length === 0 ? (
//           <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
//             <FolderOpen size={48} className="text-slate-200 mx-auto mb-4" />
//             <p className="text-slate-400 font-bold">The vault is currently empty. No documents uploaded yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {vaultItems.map((item) => (
//               <div key={item._id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col hover:border-blue-200 transition-colors">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
//                     <User size={24}/>
//                   </div>
//                   <div>
//                     <h3 className="font-black text-slate-900">{item.user?.fullName || 'Unknown User'}</h3>
//                     <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
//                       {item.answers?.service || 'Verification'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3 flex-1">
//                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
//                     Submitted Files ({item.documents.length})
//                   </p>
//                   {item.documents.map((docObj: any, idx: number) => {
//                     // FIX: Ensure we handle both string (old) and object (new) data
//                     const rawPath = typeof docObj === 'string' ? docObj : docObj?.path;
//                     if (!rawPath) return null;

//                     const isPDF = rawPath.toLowerCase().endsWith('.pdf');
//                     const fileUrl = `https://pinnacle-backend-1-qyyx.onrender.com/${rawPath.replace(/\\/g, '/')}`;

//                     return (
//                       <a 
//                         key={idx} 
//                         href={fileUrl} 
//                         target="_blank" 
//                         rel="noreferrer"
//                         className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-slate-100 group"
//                       >
//                         <div className="flex items-center gap-3">
//                           {isPDF ? (
//                             <FileText size={20} className="text-red-500" />
//                           ) : (
//                             <ImageIcon size={20} className="text-blue-500" />
//                           )}
//                           <div className="flex flex-col">
//                             <span className="text-xs font-bold text-slate-700">Document {idx + 1}</span>
//                             <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">
//                               {docObj.status || 'Pending'}
//                             </span>
//                           </div>
//                         </div>
//                         <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-600" />
//                       </a>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDocumentVault;



import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { FileText, User, ExternalLink, Image as ImageIcon, FolderOpen } from 'lucide-react';

const AdminDocumentVault = () => {
  const [vaultItems, setVaultItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const { data } = await API.get('/consultations/admin/all');
        // Filter for requests that actually have a documents array with content
        const withDocs = data.filter((req: any) => req.documents && req.documents.length > 0);
        setVaultItems(withDocs);
      } catch (err) { 
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };
    fetchVault();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">Document Vault</h1>
          <p className="text-slate-500 font-medium">Review identity and tax verification files.</p>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">Accessing Vault...</div>
        ) : vaultItems.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
            <FolderOpen size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">The vault is currently empty. No documents uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vaultItems.map((item) => (
              <div key={item._id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <User size={24}/>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">{item.user?.fullName || 'Unknown User'}</h3>
                    <p className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                      {item.answers?.service || 'Verification'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                    Submitted Files ({item.documents.length})
                  </p>
                  {item.documents.map((docObj: any, idx: number) => {
                    // Handle string (old) or object/path format (S3 URL)
                    const rawPath = typeof docObj === 'string' ? docObj : (docObj?.url || docObj?.path || docObj?.location);
                    if (!rawPath) return null;

                    const isPDF = rawPath.toLowerCase().includes('.pdf');

                    // If it's already an S3 URL or external link, use it directly. 
                    // Otherwise fallback/construct proper link.
                    let fileUrl = rawPath;
                    if (!rawPath.startsWith('http')) {
                      fileUrl = `https://pinnacle-backend-1-qyyx.onrender.com/${rawPath.replace(/\\/g, '/')}`;
                    }

                    return (
                      <a 
                        key={idx} 
                        href={fileUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-slate-100 group"
                      >
                        <div className="flex items-center gap-3">
                          {isPDF ? (
                            <FileText size={20} className="text-red-500" />
                          ) : (
                            <ImageIcon size={20} className="text-blue-500" />
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">Document {idx + 1}</span>
                            <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">
                              {docObj.status || 'Pending'}
                            </span>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-600" />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDocumentVault;