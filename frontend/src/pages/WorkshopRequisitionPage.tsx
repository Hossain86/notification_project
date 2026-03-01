import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
import { useAuth } from '../context/AuthContext';
import '../styles/WorkshopRequisitionPage.css';

interface ItemRow {
  id: number;
  workTypeCategory: string;
  workType: string;
  jobItemName: string;
  requiredQty: number;
  uom: string;
  materialsType: string;
  description: string;
  existingTG: string;
  dimensions: string;
  fixedAssetsUserId: string;
  secondRespId: string;
  location: string;
  floor: string;
}

export const WorkshopRequisitionPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [product, setProduct] = useState('Common');
  const [costCenter, setCostCenter] = useState('');
  const [hodDeputyId, setHodDeputyId] = useState('');
  const [description, setDescription] = useState('');
  
  const [items, setItems] = useState<ItemRow[]>([{
    id: 1,
    workTypeCategory: '',
    workType: '',
    jobItemName: '',
    requiredQty: 1,
    uom: 'Pcs',
    materialsType: '',
    description: '',
    existingTG: '',
    dimensions: '',
    fixedAssetsUserId: '',
    secondRespId: '',
    location: '',
    floor: ''
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
      workTypeCategory: '',
      workType: '',
      jobItemName: '',
      requiredQty: 1,
      uom: 'Pcs',
      materialsType: '',
      description: '',
      existingTG: '',
      dimensions: '',
      fixedAssetsUserId: '',
      secondRespId: '',
      location: '',
      floor: ''
    }]);
  };

  const deleteRow = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof ItemRow, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { product, costCenter, hodDeputyId, description, items });
    alert('Workshop Requisition submitted successfully!');
  };

  const sampleData = [
    { code: 221, product: 'Refrigerator', department: 'ICT', section: 'Walton Software Development', createDate: '2025-10-21 15:37:54' },
    { code: 220, product: 'Common', department: 'ICT', section: 'Walton Software Development', createDate: '2025-10-21 15:35:50' },
    { code: 218, product: 'Common', department: 'ICT', section: 'Walton Software Development', createDate: '2025-10-18 12:15:07' },
    { code: 214, product: 'Common', department: 'ICT', section: 'Walton Software Development', createDate: '2025-07-30 15:07:11' },
    { code: 213, product: 'Television (TV)', department: 'ICT', section: 'Walton Software Development', createDate: '2025-02-22 16:09:07', highlight: true },
    { code: 212, product: 'Common', department: 'ICT', section: 'Walton Software Development', createDate: '2025-02-22 16:07:23' },
    { code: 208, product: 'Blender', department: 'ICT', section: 'Walton Software Development', createDate: '2024-12-02 11:17:21' },
  ];

  return (
    <div className="workshop-req-page">
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
          <h2 className="navbar-title">Workshop Requisition</h2>
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
                <option value="Refrigerator">Refrigerator</option>
                <option value="Television">Television (TV)</option>
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
              <label>HOD/Deputy ID</label>
              <input type="text" placeholder="HOD/Deputy ID" value={hodDeputyId} onChange={(e) => setHodDeputyId(e.target.value)} />
              <a href="#" className="link-blue">#</a>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description(Why?)</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Notice Section */}
          <div className="notice-section">
            <a href="#" className="bengali-link">(নিয়মাবলী)</a>
            <p className="bengali-instruction">
              রিকুইজিশন টি Approval এর জন্য প্রথমত Concern Department এর <strong>HOD/Deputy</strong> এর Employee ID উপরোলিখিত জায়গায় বসাতে হবে।
            </p>
          </div>

          {/* Dynamic Item Table */}
          <div className="items-table-container">
            <table className="items-table">
              <thead>
                <tr className="header-row-1">
                  <th rowSpan={2}>*</th>
                  <th>WorkType Category*</th>
                  <th>WorkType*</th>
                  <th>Job/Item Name*</th>
                  <th>Required Qty*</th>
                  <th>UOM*</th>
                  <th>Materials Type</th>
                </tr>
                <tr className="header-row-2">
                  <th>Description</th>
                  <th>Existing TG</th>
                  <th className="dimensions-header">(Length X Width X Height)(Inch)*</th>
                  <th>Fixed Assets User ID*</th>
                  <th>Second Resp.ID*</th>
                  <th>Location*</th>
                  <th>Floor (As Per Lift)*</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <>
                    <tr key={`${item.id}-main`} className="item-row-main">
                      <td rowSpan={2}>
                        <button className="delete-btn" onClick={() => deleteRow(item.id)}>✕ Delete</button>
                      </td>
                      <td>
                        <select value={item.workTypeCategory} onChange={(e) => updateItem(item.id, 'workTypeCategory', e.target.value)}>
                          <option value="">Select One</option>
                          <option value="type1">Type 1</option>
                        </select>
                      </td>
                      <td>
                        <select value={item.workType} onChange={(e) => updateItem(item.id, 'workType', e.target.value)}>
                          <option value="">Select One</option>
                          <option value="work1">Work 1</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" placeholder="Job/Item Name" value={item.jobItemName} onChange={(e) => updateItem(item.id, 'jobItemName', e.target.value)} />
                      </td>
                      <td>
                        <input type="number" value={item.requiredQty} onChange={(e) => updateItem(item.id, 'requiredQty', parseInt(e.target.value) || 1)} />
                      </td>
                      <td>
                        <input type="text" placeholder="Pcs" value={item.uom} onChange={(e) => updateItem(item.id, 'uom', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" placeholder="Enter Materials Type" value={item.materialsType} onChange={(e) => updateItem(item.id, 'materialsType', e.target.value)} />
                      </td>
                    </tr>
                    <tr key={`${item.id}-sub`} className="item-row-sub">
                      <td>
                        <input type="text" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={item.existingTG} onChange={(e) => updateItem(item.id, 'existingTG', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" placeholder="L X W X H" value={item.dimensions} onChange={(e) => updateItem(item.id, 'dimensions', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={item.fixedAssetsUserId} onChange={(e) => updateItem(item.id, 'fixedAssetsUserId', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={item.secondRespId} onChange={(e) => updateItem(item.id, 'secondRespId', e.target.value)} />
                      </td>
                      <td>
                        <select value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)}>
                          <option value="">Select One</option>
                          <option value="loc1">Location 1</option>
                        </select>
                      </td>
                      <td>
                        <select value={item.floor} onChange={(e) => updateItem(item.id, 'floor', e.target.value)}>
                          <option value="">Select One</option>
                          <option value="floor1">Floor 1</option>
                        </select>
                      </td>
                    </tr>
                  </>
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
                  <th>Product</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, index) => (
                  <tr key={index} className={row.highlight ? 'highlighted' : ''}>
                    <td>{row.code}</td>
                    <td><span className="details-arrow">↓↓</span></td>
                    <td>{row.product}</td>
                    <td>{row.department}</td>
                    <td>{row.section}</td>
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
