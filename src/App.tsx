import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RouteGuard } from './components/RouteGuard';
import { Navbar } from './components/Navbar';
import { StripeTestPanel } from './components/StripeTestPanel';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { GetStarted } from './pages/GetStarted';
import { ResetPassword } from './pages/ResetPassword';
import { Admin } from './pages/Admin';
import { StageCue } from './pages/Demo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteGuard>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/success" element={<Success />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/demo" element={<StageCue />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <StripeTestPanel />
          </div>
        </RouteGuard>
      </Router>
    </AuthProvider>
  );
}

export default App;