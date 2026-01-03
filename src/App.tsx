import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Billing from './pages/Billing';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import UserPayouts from './pages/UserPayouts';
import UserSupport from './pages/UserSupport';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ width: '100vw', overflowX: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Legal pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* User-specific pages */}
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/payouts" element={<UserPayouts />} />
            <Route path="/user/support" element={<UserSupport />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;