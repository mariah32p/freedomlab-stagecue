import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RouteGuard } from './components/RouteGuard';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { ResetPassword } from './pages/ResetPassword';
import { GetStarted } from './pages/GetStarted.tsx';
import { StageCue } from './pages/Demo';

function AppContent() {
  const location = useLocation();
  const isDemoPage = location.pathname === '/demo';

  return (
    <RouteGuard>
      <div className="min-h-screen bg-gray-50">
        {!isDemoPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/demo" element={<StageCue />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </RouteGuard>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;