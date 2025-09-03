import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RouteGuard } from './components/RouteGuard';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Success } from './pages/Success';
import { GetStarted } from './pages/GetStarted';
import { ResetPassword } from './pages/ResetPassword';
import { Settings } from './pages/Settings';
import { StageCue as Demo } from './pages/Demo';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CountdownDisplay } from './pages/CountdownDisplay';
import { SpeakerPortal } from './pages/SpeakerPortal';

function AppWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteGuard>
          <Routes>
            {/* Public countdown display - no navbar */}
            <Route path="/display/:eventId" element={<CountdownDisplay />} />
            <Route path="/display/:eventId/:blockId" element={<CountdownDisplay />} />
            <Route path="/speaker/:speakerId" element={<SpeakerPortal />} />
            
            {/* Regular app routes with navbar */}
            <Route path="/" element={<AppWithNavbar />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="success" element={<Success />} />
              <Route path="get-started" element={<GetStarted />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="demo" element={<Demo />} />

              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </RouteGuard>
      </Router>
    </AuthProvider>
  );
}

export default App;