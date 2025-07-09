import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import AuthContext from '../../AuthContext'

const UserProfileSidebar = ({ closeProfile }) => {
  const {user, loading, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  useEffect(() => {
    console.log('UserProfile user state:', user);
  }, [user])

  //function to derive intials from username
  const getInitials = (name) => {
    if (!name) return 'N/A';
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0].slice(0, 2).toUpperCase();
  }

  //handle login button click
  const handleLogin = () => {
   navigate('/login') //navigate jastai ho
  }


  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" key={user?.email || 'no-user'}>
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-bold text-rose-700" id="slide-over-title">
                      User Profile
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={closeProfile}
                        type="button"
                        className="relative -m-2 p-2 text-rose-400 hover:text-rose-500 cursor-pointer"
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="mt-8 flex flex-col items-center">
                      <p className="text-lg font-medium text-rose-700">Loading...</p>
                    </div>
                  ) : user ? (
                    <div className="mt-8 flex flex-col items-center">
                      <div className="w-24 h-24 bg-rose-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                        {getInitials(user.displayName || user.email)}
                      </div>
                      <h3 className="text-xl font-bold text-rose-700 mt-4">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-sm text-rose-400 mt-1">{user.email}</p>
                    </div>
                  ) : (
                    <div className="mt-8 flex flex-col items-center">
                      <p className="text-lg font-medium text-rose-700">You are not logged in</p>
                      <button
                        onClick={handleLogin}
                        className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-rose-500"
                      >
                        Login Now
                      </button>
                    </div>
                  )}
                </div>

                {user && !loading && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="space-y-4">
                      <button
                        onClick={() => setIsOrderHistoryOpen(true)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-rose-500 w-full"
                      >
                        Order History
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          closeProfile();
                          navigate('/'); // Navigate to landing page after logout
                        }}
                        className="flex items-center justify-center rounded-md border border-transparent bg-rose-200 px-6 py-3 text-base font-medium text-rose-700 hover:bg-rose-300 w-full"
                      >
                        Logout
                      </button>
                      {isOrderHistoryOpen && <OrderHistory closeOrderHistory={() => setIsOrderHistoryOpen(false)} />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;