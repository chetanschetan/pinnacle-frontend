// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login'
// import Onboarding from './pages/Onboarding';
// import Consultation from './pages/ConsultationPage';
// import Services from './components/Services';
// import UserDashboard from './pages/UserDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminRequestDetail from './pages/AdminRequestDetail';
// import AdminUserHistory from './pages/AdminUserHistory';
// import Register from './pages/Register';
// import VerifyEmail from './pages/VerifyEmail';
// import DocumentSubmit from './pages/DocumentSubmit';
// import AdminDocumentVault from './pages/AdminDocumentVault';

// // Add other pages here...

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Register />} />
//         <Route path="/services" element={<Services />}/>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/onboarding" element={<Onboarding />} />
//         <Route path="/book-consultation" element={<Consultation />} />
//         <Route path="/userdashboard" element={<UserDashboard />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/request/:id" element={<AdminRequestDetail />} />
//         <Route path="/admin/client/:userId" element={<AdminUserHistory />} />
//         {/* <Route path="/register" element={<Register />} /> */}
//         <Route path="/verify-email" element={<VerifyEmail />} />
//         <Route path="/submit-docs/:id" element={<DocumentSubmit />} />
//         <Route path="/admin/vault" element={<AdminDocumentVault />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Consultation from './pages/ConsultationPage';
import Services from './components/Services';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminRequestDetail from './pages/AdminRequestDetail';
import AdminUserHistory from './pages/AdminUserHistory';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import DocumentSubmit from './pages/DocumentSubmit';
import AdminDocumentVault from './pages/AdminDocumentVault';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/book-consultation" element={<Consultation />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/request/:id" element={<AdminRequestDetail />} />
        <Route path="/admin/client/:userId" element={<AdminUserHistory />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/submit-docs/:id" element={<DocumentSubmit />} />
        <Route path="/admin/vault" element={<AdminDocumentVault />} />
      </Routes>
    </Router>
  );
}

export default App;