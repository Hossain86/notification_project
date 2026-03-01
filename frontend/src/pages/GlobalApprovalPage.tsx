import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
import { useAuth } from '../context/AuthContext';
import '../styles/GlobalApprovalPage.css';

export const GlobalApprovalPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="global-approval-page">
      {/* Header */}
      <header className="app-header">
        <div className="header-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/walton.webp" alt="Walton Logo" className="header-logo" />
          <h1>Notification Management System</h1>
        </div>
        <div className="header-actions">
          <NotificationIcon />
          <span className="user-info">Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      {/* Global Approval Navbar */}
      <div className="global-approval-navbar">
        <div className="navbar-left">
          <button className="back-btn" onClick={handleBack}>← Back</button>
          <h2 className="navbar-title">Global Approval System</h2>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" title="Settings">⚙️</button>
          <button className="icon-btn" title="Refresh">🔄</button>
          <button className="icon-btn" title="Collapse">⬇️</button>
          <button className="icon-btn" title="Close" onClick={handleBack}>✕</button>
          <input
            type="text"
            className="search-employee-input"
            placeholder="Search Employee"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="global-approval-content">
        <NavigationMenu />

        {/* Left Sidebar - Dropdown */}
        <div className="left-sidebar">
          <label className="dropdown-label">Select One:</label>
          <select
            className="approval-dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select One</option>
            <option value="financial">Financial Approval</option>
            <option value="non-financial">Non-Financial Approval</option>
            <option value="investigation">Investigation purpose</option>
            <option value="audit">Audit purpose</option>
            <option value="foreign">Foreign purchases</option>
          </select>
        </div>

        {/* Right Content Area */}
        <div className="right-content">
          {/* Page Title */}
          <h1 className="page-title">Global Approval System's Tutorial</h1>

          {/* Available Forms Section */}
          <section className="forms-section">
            <h2 className="section-heading">Available Forms for Submission</h2>
            <table className="forms-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>TITLE</th>
                  <th>DOWNLOAD</th>
                  <th>NOTE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Accommodation Application Form</td>
                  <td>
                    <a href="#" className="download-link">Download</a>
                  </td>
                  <td>
                    Approval path: Applicant, In charge/HOD, Admin HOD, AMD (Only for External Guest), Hospitality Mgt. In-charge
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Announcement Banner */}
          <div className="announcement-banner">
            <span className="warning-icon">⚠️</span>
            <span className="announcement-text">
              ২৪ই জুন ২০২৫ থেকে গ্লোবাল এপ্রুভাল সিস্টেমে দুইটি গুরুত্বপূর্ণ পরিবর্তন আনা হয়েছে:
            </span>
            <span className="warning-icon">⚠️</span>
          </div>

          {/* Bengali Numbered List */}
          <div className="bengali-content">
            <p className="bengali-paragraph">
              <strong>১.</strong> এখন থেকে এপ্রুভাল সিস্টেমে সাবমিট করার পর এপ্রুভার যদি আপনার এপ্লিকেশনটি 
              রিজেক্ট করেন তাহলে আপনি আবার এটি এডিট করতে পারবেন এবং পুনরায় সাবমিট করতে পারবেন। 
              এভাবে আপনি যতবার খুশি এডিট ও সাবমিট করতে পারবেন যতক্ষণ পর্যন্ত না আপনার এপ্লিকেশনটি 
              এপ্রুভ হয়।
            </p>
            <p className="bengali-paragraph">
              <strong>২.</strong> আগে এপ্রুভাল সিস্টেমে সাবমিট করার পর কোন কারণে আপনি যদি মনে করেন যে 
              আপনার এপ্লিকেশনটি ভুল হয়ে গেছে এবং আপনি এটিকে ডিলিট করে নতুন করে আবার এপ্লাই করতে 
              চান তাহলে আপনাকে ISD তে মেইল করতে হতো। এখন থেকে আপনি চাইলে নিজে থেকেই এপ্লিকেশনটি 
              ক্যান্সেল করতে পারবেন এবং নতুন করে এপ্লাই করতে পারবেন।
            </p>
            <p className="bengali-paragraph">
              <strong>৩.</strong> তবে খেয়াল রাখবেন, আপনি শুধুমাত্র তখনই ক্যান্সেল করতে পারবেন যখন 
              এপ্লিকেশনটি কোন এপ্রুভারের কাছে পেন্ডিং থাকবে। একবার এপ্রুভ হয়ে গেলে আর ক্যান্সেল করতে 
              পারবেন না। এই ক্ষেত্রে ISD তে মেইল করতে হবে।{' '}
              <a href="#" className="details-link">বিস্তারিত--&gt;</a>
            </p>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <p className="note-paragraph">
              <strong>নোট:</strong> গ্লোবাল এপ্রুভাল সিস্টেমে এপ্লিকেশন সাবমিট করার আগে অবশ্যই সংশ্লিষ্ট 
              ফরম ডাউনলোড করে পূরণ করে নিতে হবে এবং সাবমিট করার সময় সেই পূরণকৃত ফরমটি এটাচমেন্ট 
              হিসেবে আপলোড করতে হবে।
            </p>
            <p className="note-paragraph italic">
              <strong>নোট:</strong> আর্থিক বিষয়ক (Financial) যে কোন ডকুমেন্ট এপ্রুভালের জন্য গ্লোবাল 
              এপ্রুভাল সিস্টেম ব্যবহার করা যাবে না।
            </p>
            <p className="note-paragraph italic">
              <strong>বিঃ দ্রঃ</strong> PR (Purchase Request), PO (Purchase Order), LC (Letter of Credit), 
              Advance, Move Order, Asset Requisition ইত্যাদি সিস্টেম আলাদাভাবে চালু আছে। এগুলোর জন্য 
              গ্লোবাল এপ্রুভাল সিস্টেম ব্যবহার করা যাবে না।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
