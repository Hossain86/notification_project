import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotificationDetailPage } from './pages/NotificationDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications/:categoryName" element={<NotificationDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
