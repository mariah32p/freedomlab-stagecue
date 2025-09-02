import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RouteGuard from './components/RouteGuard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import Pricing from './pages/Pricing';
import Success from './pages/Success';
import GetStarted from './pages/GetStarted';
import ResetPassword from './pages/ResetPassword';
import { Admin } from './pages/Admin';
import Demo from './pages/Demo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteGuard>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </RouteGuard>
      </Router>
    </AuthProvider>
  );
}

export default App;