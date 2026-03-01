import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { NotificationDetailPage } from './pages/NotificationDetailPage';
import { GlobalApprovalPage } from './pages/GlobalApprovalPage';
import { SoftwareRequisitionPage } from './pages/SoftwareRequisitionPage';
import { WorkshopRequisitionPage } from './pages/WorkshopRequisitionPage';
import { PaintRequisitionPage } from './pages/PaintRequisitionPage';
import { ESMRequisitionPage } from './pages/ESMRequisitionPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/global-approval" 
            element={
              <ProtectedRoute>
                <GlobalApprovalPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/software-req-system" 
            element={
              <ProtectedRoute>
                <SoftwareRequisitionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workshop-system" 
            element={
              <ProtectedRoute>
                <WorkshopRequisitionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/paint-requisition" 
            element={
              <ProtectedRoute>
                <PaintRequisitionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/esm-automation" 
            element={
              <ProtectedRoute>
                <ESMRequisitionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications/:categoryName" 
            element={
              <ProtectedRoute>
                <NotificationDetailPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
