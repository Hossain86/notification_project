import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavigationMenu.css';

interface SubCategory {
  name: string;
  path?: string;
}

interface MenuItem {
  name: string;
  path?: string;
  subCategories?: SubCategory[];
}

export const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const menuItems: MenuItem[] = [
    { 
      name: 'Public Requisition',
      subCategories: [
        { name: 'Global Approval' },
        { name: 'Software Requisition' },
        { name: 'EHS Requisition' },
        { name: 'Workshop Requisition' },
        { name: 'Utility & Plumbing' },
        { name: 'Heavy Vehicle Requisition' },
        { name: 'ESM Headquarters' },
        { name: 'ESM Corporate' },
        { name: 'Paint Requisition' },
        { name: 'Computer & PCB Req' },
        { name: 'Wastage Declaration' },
        { name: 'Gift Requisition' },
        { name: 'Permit To Work' },
        { name: 'Carpenter Requisition' },
        { name: 'Policy Approval' },
        { name: 'Machine Making Requisition' },
        { name: 'Service Center Requisition' },
      ]
    },
    { 
      name: 'Global Approval',
      path: '/global-approval',
      subCategories: [
        { name: 'Global Report' },
        { name: 'Departmental Report' },
        { name: 'Foreign Purchase Report' },
        { name: 'Bill Verification' },
        { name: 'Accounts' },
        { name: 'Finance' },
      ]
    },
    { 
      name: 'Gift Management',
      subCategories: [
        { name: 'Gift Search' },
        { name: 'Finance' },
        { name: 'Accounts' },
        { name: 'Bill Verification' },
      ]
    },
    { 
      name: 'Carpenter System',
      subCategories: [
        { name: 'Notification' },
      ]
    },
    { 
      name: 'Heavy Vehicle',
      subCategories: [
        { name: 'Pending Category' },
        { name: 'Vehicle Setup' },
        { name: 'Notification' },
      ]
    },
    { 
      name: 'IT Product Service',
      subCategories: [
        { name: 'Service Request' },
      ]
    },
    { 
      name: 'ESM Automation',
      subCategories: []
    },
    { 
      name: 'Report',
      subCategories: [
        { name: 'Report_1' },
      ]
    },
    { 
      name: 'Service Center',
      subCategories: [
        { name: 'Add Item Name' },
        { name: 'Operation' },
        { name: 'Front desk panel' },
      ]
    },
    { 
      name: 'Software Req System',
      subCategories: []
    },
    { 
      name: 'HVAC System',
      subCategories: []
    },
    { 
      name: 'Utility & Plumbing',
      subCategories: []
    },
    { 
      name: 'Paint Requisition',
      subCategories: []
    },
    { 
      name: 'Electrical System',
      subCategories: []
    },
    { 
      name: 'Workshop System',
      subCategories: [
        { name: 'Details Report' },
        { name: 'InboxStore' },
        { name: 'Inbox' },
        { name: 'Notification' },
      ]
    },
    { 
      name: 'EHS System',
      subCategories: []
    },
    { 
      name: 'Comp & PCB Req',
      subCategories: []
    },
    { 
      name: 'Permit To Work',
      subCategories: []
    },
    { 
      name: 'Admin Panel',
      subCategories: [
        { name: 'Approver Change' },
        { name: 'Approver Amendment' },
        { name: 'Approver Permission' },
      ]
    },
    { 
      name: 'Global Configuration',
      subCategories: [
        { name: 'Create Project' },
        { name: 'User Permission' },
        { name: 'Path Access' },
      ]
    },
    { 
      name: 'Wastage System',
      subCategories: [
        { name: 'Notification' },
        { name: 'Item Receive' },
        { name: 'Stock Adjustment' },
        { name: 'Sales' },
        { name: 'Details Report' },
      ]
    },
    { 
      name: 'Machine Making Sys',
      subCategories: []
    },
  ];

  const toggleExpand = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleCategoryClick = (item: MenuItem) => {
    if (item.subCategories && item.subCategories.length > 0) {
      toggleExpand(item.name);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path: string | undefined) => {
    if (!path) return false;
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isExpanded = (itemName: string) => expandedItems.has(itemName);

  return (
    <div className="navigation-menu">
      {menuItems.map((item, index) => (
        <div key={index} className="nav-menu-category">
          <div
            className={`nav-menu-item ${isActive(item.path) ? 'active' : ''} ${
              item.subCategories && item.subCategories.length > 0 ? 'has-subcategories' : ''
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            <span className="nav-item-text">{item.name}</span>
            {item.subCategories && item.subCategories.length > 0 && (
              <span className={`nav-item-arrow ${isExpanded(item.name) ? 'expanded' : ''}`}>
                ▼
              </span>
            )}
          </div>
          {item.subCategories && item.subCategories.length > 0 && isExpanded(item.name) && (
            <div className="nav-subcategories">
              {item.subCategories.map((sub, subIndex) => (
                <div
                  key={subIndex}
                  className="nav-subcategory-item"
                >
                  {sub.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
