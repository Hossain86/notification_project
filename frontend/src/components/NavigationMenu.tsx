import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/NavigationMenu.css';

export const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Notification', path: '/' },
    { name: 'Public Requisition', path: '/public-requisition' },
    { name: 'Global Approval', path: '/global-approval' },
    { name: 'Gift Management', path: '/gift-management' },
    { name: 'Carpenter System', path: '/carpenter-system' },
    { name: 'Heavy Vehicle', path: '/heavy-vehicle' },
    { name: 'IT Product Service', path: '/it-product-service' },
    { name: 'ESM Automation', path: '/esm-automation' },
    { name: 'Report', path: '/report' },
    { name: 'Service Center', path: '/service-center' },
    { name: 'Software Req System', path: '/software-req-system' },
    { name: 'HVAC System', path: '/hvac-system' },
    { name: 'Utility & Plumbing', path: '/utility-plumbing' },
    { name: 'Paint Requisition', path: '/paint-requisition' },
    { name: 'Electrical System', path: '/electrical-system' },
    { name: 'Workshop System', path: '/workshop-system' },
    { name: 'EHS System', path: '/ehs-system' },
    { name: 'Comp & PCB Req', path: '/comp-pcb-req' },
    { name: 'Permit To Work', path: '/permit-to-work' },
    { name: 'Admin Panel', path: '/admin-panel' },
    { name: 'Global Configuration', path: '/global-configuration' },
    { name: 'Wastage System', path: '/wastage-system' },
    { name: 'Machine Making System', path: '/machine-making-system' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="navigation-menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`nav-menu-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
