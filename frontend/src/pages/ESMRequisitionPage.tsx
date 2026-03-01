import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
import '../styles/ESMRequisitionPage.css';

export const ESMRequisitionPage = () => {
  const navigate = useNavigate();
  const [selectedRequisition, setSelectedRequisition] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const requisitionTypes = [
    { id: 'electrical', name: 'Electrical Requisition', icon: '⚡' },
    { id: 'utility-plumber', name: 'Utility & Plumber Requisition', icon: '🔧' },
    { id: 'hvac', name: 'HVAC Requisition', icon: '❄️' },
    { id: 'civil', name: 'Civil Requisition', icon: '🏗️' },
    { id: 'fire-safety', name: 'Fire Safety Requisition', icon: '🚒' },
    { id: 'generator', name: 'Generator Requisition', icon: '⚙️' },
    { id: 'automation', name: 'Automation Requisition', icon: '🤖' },
    { id: 'maintenance', name: 'Maintenance Requisition', icon: '🔨' },
  ];

  const handleRequisitionSelect = (id: string) => {
    setSelectedRequisition(id);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const getRequisitionContent = () => {
    const selected = requisitionTypes.find(req => req.id === selectedRequisition);
    
    if (!selectedRequisition) {
      return (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>Select a Requisition Type</h2>
          <p>Choose a requisition type from the drawer to get started</p>
        </div>
      );
    }

    return (
      <div className="requisition-content">
        <div className="content-header">
          <h2>{selected?.icon} {selected?.name}</h2>
          <button className="refresh-btn">🔄 Refresh</button>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label>Request ID</label>
              <input type="text" value="AUTO" disabled />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label>Priority <span className="required">*</span></label>
              <select defaultValue="normal">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Department <span className="required">*</span></label>
              <input type="text" placeholder="Enter department" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Requested By <span className="required">*</span></label>
              <input type="text" placeholder="Employee name" />
            </div>
            <div className="form-group">
              <label>Employee ID <span className="required">*</span></label>
              <input type="text" placeholder="Enter ID" />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="tel" placeholder="Phone number" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="email@example.com" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Location/Area <span className="required">*</span></label>
              <input type="text" placeholder="Building, Floor, Room details" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Work Description <span className="required">*</span></label>
              <textarea rows={4} placeholder="Describe the work required in detail..."></textarea>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expected Completion Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Budget Estimate</label>
              <input type="number" placeholder="Approximate cost" />
            </div>
            <div className="form-group">
              <label>Approval Status</label>
              <select defaultValue="pending">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="submit-btn">Submit Requisition</button>
            <button className="draft-btn">Save as Draft</button>
            <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>

        <div className="recent-requisitions">
          <h3>Recent {selected?.name}s</h3>
          <table className="requisitions-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Date</th>
                <th>Department</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESM-{selectedRequisition.toUpperCase()}-001</td>
                <td>2026-02-28</td>
                <td>Production</td>
                <td>Repair work required</td>
                <td><span className="priority-badge high">High</span></td>
                <td><span className="status-badge pending">Pending</span></td>
                <td><button className="view-btn">View</button></td>
              </tr>
              <tr>
                <td>ESM-{selectedRequisition.toUpperCase()}-002</td>
                <td>2026-02-27</td>
                <td>Maintenance</td>
                <td>Regular inspection</td>
                <td><span className="priority-badge normal">Normal</span></td>
                <td><span className="status-badge approved">Approved</span></td>
                <td><button className="view-btn">View</button></td>
              </tr>
              <tr>
                <td>ESM-{selectedRequisition.toUpperCase()}-003</td>
                <td>2026-02-25</td>
                <td>Engineering</td>
                <td>New installation</td>
                <td><span className="priority-badge urgent">Urgent</span></td>
                <td><span className="status-badge approved">Approved</span></td>
                <td><button className="view-btn">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="esm-req-page">
      <header className="req-navbar">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>ESM Requisition System</h1>
        <div className="navbar-icons">
          <button className="icon-btn gear-icon">⚙️</button>
          <NotificationIcon />
        </div>
      </header>

      <div className="req-content">
        <NavigationMenu />
        
        <div className={`input-drawer ${isDrawerOpen ? 'open' : 'closed'}`}>
          <div className="drawer-header">
            <h3>Requisition Types</h3>
            <button className="toggle-drawer-btn" onClick={toggleDrawer}>
              {isDrawerOpen ? '«' : '»'}
            </button>
          </div>
          {isDrawerOpen && (
            <div className="drawer-content">
              {requisitionTypes.map((req) => (
                <div
                  key={req.id}
                  className={`drawer-item ${selectedRequisition === req.id ? 'active' : ''}`}
                  onClick={() => handleRequisitionSelect(req.id)}
                >
                  <span className="drawer-icon">{req.icon}</span>
                  <span className="drawer-text">{req.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="main-content">
          {getRequisitionContent()}
        </div>
      </div>
    </div>
  );
};
