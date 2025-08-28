import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-navy-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
              <span className="text-xl font-bold text-navy-900">StageCue</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-navy-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/pricing" className="text-navy-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium">
                  Pricing
                </Link>
                <Link to="/login" className="text-navy-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}