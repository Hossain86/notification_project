import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
import { useAuth } from '../context/AuthContext';
import '../styles/PaintRequisitionPage.css';

interface PaintItem {
  id: number;
  taskType: string;
  workDescription: string;
  location: string;
  squareFeet: string;
  qty: number;
  unit: string;
  tg: string;
  paintOrColor: string;
}

export const PaintRequisitionPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [product, setProduct] = useState('Common');
  const [costCenter, setCostCenter] = useState('');
  const [sectionInchargeId, setSectionInchargeId] = useState('');
  const [hodDeputyId, setHodDeputyId] = useState('');
  const [description, setDescription] = useState('For Official');
  
  const [items, setItems] = useState<PaintItem[]>([{
    id: 1,
    taskType: '',
    workDescription: '',
    location: '',
    squareFeet: '',
    qty: 1,
    unit: 'Feet',
    tg: '',
    paintOrColor: ''
  }]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/');
  };

  const addMoreRow = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, {
      id: newId,
      taskType: '',
      workDescription: '',
      location: '',
      squareFeet: '',
      qty: 1,
      unit: 'Feet',
      tg: '',
      paintOrColor: ''
    }]);
  };

  const deleteRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof PaintItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { product, costCenter, sectionInchargeId, hodDeputyId, description, items });
    alert('Paint Requisition submitted successfully!');
  };

  const sampleData = [
    { code: 43, costCenter: 'Common', description: 'test', department: 'ICT', createDate: '2024-12-08 10:51:04' },
    { code: 39, costCenter: 'Common', description: 'For Official', department: 'ICT', createDate: '2024-09-25 15:08:56' },
    { code: 37, costCenter: 'Common', description: 'For Official', department: 'ICT', createDate: '2024-05-11 16:55:19' },
    { code: 34, costCenter: 'Common', description: 'For Official', department: 'ICT', createDate: '2023-09-26 14:50:29' },
    { code: 32, costCenter: 'Administration-Legal & Investigation', description: 'For Official', department: 'ICT', createDate: '2023-08-31 12:28:02' },
    { code: 31, costCenter: 'Administration-Legal & Investigation', description: 'For Official', department: 'ICT', createDate: '2023-08-31 12:26:55' },
    { code: 23, costCenter: 'Finance & Accounts-Finance-Financing', description: 'For Official', department: 'IT', createDate: '2023-07-13 14:39:26', highlight: true },
    { code: 22, costCenter: 'Common', description: 'For Official', department: 'IT', createDate: '2023-07-11 14:25:44' },
    { code: 20, costCenter: 'Administration-Legal & Investigation', description: 'For Official', department: 'IT', createDate: '2023-06-26 12:46:15' },
  ];

  return (
    <div className="paint-req-page">
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
          <h2 className="navbar-title">Paint Requisition</h2>
        </div>
        <div className="navbar-right">
          <button className="icon-btn gear-icon" title="Settings">⚙️</button>
          <button className="icon-btn" title="Refresh">🔄</button>
          <button className="icon-btn" title="Collapse">⬇️</button>
          <button className="icon-btn" title="Close" onClick={handleBack}>✕</button>
        </div>
      </div>

      <div className="req-content">
        <NavigationMenu />

        <div className="form-container">
          {/* Top Form */}
          <div className="top-form">
            <div className="form-group">
              <label>Product</label>
              <select value={product} onChange={(e) => setProduct(e.target.value)}>
                <option value="Common">Common</option>
                <option value="Administration">Administration-Legal & Investigation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cost Center*</label>
              <select value={costCenter} onChange={(e) => setCostCenter(e.target.value)}>
                <option value="">Select One</option>
                <option value="center1">Cost Center 1</option>
                <option value="center2">Cost Center 2</option>
              </select>
            </div>

            <div className="form-group">
              <label>Section Incharge/Deputy ID*</label>
              <input type="text" placeholder="Employee ID" value={sectionInchargeId} onChange={(e) => setSectionInchargeId(e.target.value)} />
              <a href="#" className="link-blue">#</a>
            </div>

            <div className="form-group">
              <label>HOD/Deputy ID*</label>
              <input type="text" placeholder="Employee ID" value={hodDeputyId} onChange={(e) => setHodDeputyId(e.target.value)} />
              <a href="#" className="link-blue">#</a>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description(Why?)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Dynamic Item Table */}
          <div className="items-table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Task type</th>
                  <th>Work Description</th>
                  <th>Location</th>
                  <th className="square-feet-header">Square Feet</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>TG</th>
                  <th>Paint or Color</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <button className="delete-btn" onClick={() => deleteRow(item.id)}>✕ Delete</button>
                    </td>
                    <td>
                      <select value={item.taskType} onChange={(e) => updateItem(item.id, 'taskType', e.target.value)}>
                        <option value="">Select One</option>
                        <option value="painting">Painting</option>
                        <option value="renovation">Renovation</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" value={item.workDescription} onChange={(e) => updateItem(item.id, 'workDescription', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Square Feet" value={item.squareFeet} onChange={(e) => updateItem(item.id, 'squareFeet', e.target.value)} />
                    </td>
                    <td>
                      <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Feet" value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Enter TG" value={item.tg} onChange={(e) => updateItem(item.id, 'tg', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Paint Or Color" value={item.paintOrColor} onChange={(e) => updateItem(item.id, 'paintOrColor', e.target.value)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer">
              <button className="add-more-btn" onClick={addMoreRow}>+ Add More</button>
              <span className="total-count">Total: {items.length}</span>
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>✓ Submit</button>

          {/* Data Table */}
          <div className="data-table-section">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Details</th>
                  <th>Cost Center</th>
                  <th>Description</th>
                  <th>For Department</th>
                  <th>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, index) => (
                  <tr key={index} className={row.highlight ? 'highlighted' : ''}>
                    <td>{row.code}</td>
                    <td><span className="details-arrow">↓↓</span></td>
                    <td>{row.costCenter}</td>
                    <td>{row.description}</td>
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
