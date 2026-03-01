import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
import { useAuth } from '../context/AuthContext';
import '../styles/SoftwareRequisitionPage.css';

export const SoftwareRequisitionPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    requestToSection: '',
    team: '',
    serviceList: '',
    requestBy: '',
    sectionInchargeId: '11156',
    hodDeputyId: '',
    projectOwnerId: '',
    location: '',
    taskTitle: '',
    whyRequired: '',
    costSaving: '',
    requirementDetails: ''
  });

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Software Requisition submitted successfully!');
  };

  const sampleData = [
    { code: 78, requestType: 'New System/ Project dev.', taskTitle: 'sdfsfd', department: 'ICT', createDate: '2026-01-08 14:26:27' },
    { code: 73, requestType: 'Software Modification', taskTitle: 'TEST', department: 'ICT', createDate: '2025-12-22 15:56:30' },
    { code: 72, requestType: 'New System/ Project dev.', taskTitle: 'tere erge', department: 'ICT', createDate: '2025-12-22 15:53:57' },
    { code: 71, requestType: 'New System/ Project dev.', taskTitle: 'rerfe', department: 'ICT', createDate: '2025-12-22 15:51:25' },
  ];

  return (
    <div className="software-req-page">
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

      <div className="req-navbar">
        <div className="navbar-left">
          <button className="back-btn" onClick={handleBack}>← Back</button>
          <h2 className="navbar-title">Software Requisition</h2>
        </div>
        <div className="navbar-right">
          <button className="icon-btn" title="Settings">⚙️</button>
          <button className="icon-btn" title="Refresh">🔄</button>
          <button className="icon-btn" title="Collapse">⬇️</button>
          <button className="icon-btn" title="Close" onClick={handleBack}>✕</button>
        </div>
      </div>

      <div className="req-content">
        <NavigationMenu />

        <div className="form-container">
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="form-group">
                <label>Request to Section*</label>
                <select value={formData.requestToSection} onChange={(e) => setFormData({...formData, requestToSection: e.target.value})}>
                  <option value="">Select One</option>
                  <option value="development">Development</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div className="form-group">
                <label>Team*</label>
                <select value={formData.team} onChange={(e) => setFormData({...formData, team: e.target.value})}>
                  <option value="">Select One</option>
                  <option value="backend">Backend Team</option>
                  <option value="frontend">Frontend Team</option>
                </select>
              </div>

              <div className="form-group">
                <label>Service List*</label>
                <select value={formData.serviceList} onChange={(e) => setFormData({...formData, serviceList: e.target.value})}>
                  <option value="">Select One</option>
                  <option value="new">New System/Project</option>
                  <option value="modification">Modification</option>
                </select>
              </div>

              <div className="form-group">
                <label>Request By*</label>
                <input type="text" placeholder="Employee ID" value={formData.requestBy} onChange={(e) => setFormData({...formData, requestBy: e.target.value})} />
                <a href="#" className="link-blue">#</a>
              </div>

              <div className="form-group">
                <label>Section Incharge ID*</label>
                <input type="text" value={formData.sectionInchargeId} onChange={(e) => setFormData({...formData, sectionInchargeId: e.target.value})} />
                <a href="#" className="link-blue">#Utpal Bhowmick</a>
              </div>

              <div className="form-group">
                <label>HOD/Deputy ID*</label>
                <input type="text" placeholder="ID/Name/Mb" value={formData.hodDeputyId} onChange={(e) => setFormData({...formData, hodDeputyId: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Project Owner ID</label>
                <input type="text" placeholder="ID/Name/Mb" value={formData.projectOwnerId} onChange={(e) => setFormData({...formData, projectOwnerId: e.target.value})} />
              </div>

              <button className="submit-btn" onClick={handleSubmit}>✓ Submit</button>
            </div>

            {/* Right Column */}
            <div className="form-column right-column">
              <div className="form-row">
                <div className="form-group inline">
                  <label>Location*</label>
                  <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}>
                    <option value="">Select One</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                  </select>
                </div>

                <div className="form-group inline">
                  <label>Task Title*</label>
                  <input type="text" value={formData.taskTitle} onChange={(e) => setFormData({...formData, taskTitle: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label>Why Required*</label>
                <input type="text" value={formData.whyRequired} onChange={(e) => setFormData({...formData, whyRequired: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Cost Saving <span className="approximate">(Approximate)</span>* / Month</label>
                <input type="text" placeholder="Taka / Month" value={formData.costSaving} onChange={(e) => setFormData({...formData, costSaving: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="bold-blue">Requirement Details</label>
                <div className="editor-toolbar">
                  <button>A</button>
                  <button>Tt</button>
                  <button><strong>B</strong></button>
                  <button><em>I</em></button>
                  <button><s>S</s></button>
                  <button><u>U</u></button>
                  <button>☰</button>
                  <button>≡</button>
                  <button>🔗</button>
                  <button>🖼️</button>
                  <button>🎨</button>
                  <button>↶</button>
                  <button>↷</button>
                </div>
                <textarea className="editor-content" rows={8} value={formData.requirementDetails} onChange={(e) => setFormData({...formData, requirementDetails: e.target.value})}></textarea>
              </div>

              <p className="bengali-note">রিকুইজিশন সাবমিট করার পর ভিউ করে প্রয়োজনীয় ডকুমেন্ট সাবমিট করুন!!!!</p>
            </div>
          </div>

          {/* Data Table */}
          <div className="data-table-section">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Details</th>
                  <th>Request Type</th>
                  <th>Task Title</th>
                  <th>For Department</th>
                  <th>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.code}</td>
                    <td><span className="details-arrow">↓↓</span></td>
                    <td>{row.requestType}</td>
                    <td>{row.taskTitle}</td>
                    <td>{row.department}</td>
                    <td>{row.createDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
