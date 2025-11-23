import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useUser,
  useClerk
} from '@clerk/clerk-react';

const Navbar = ({ cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  
  const menuItems = [
    { name: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Restaurants', path: '/restaurants', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
    { name: 'About Us', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Contact', path: '/contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const handleSignOut = () => {
    signOut();
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleManageAccount = () => {
    openUserProfile();
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-[#1a1a2e] shadow-md sticky top-0 z-50 border-b border-[#2c2c54]">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#ffc107] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1a1a2e]" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white ml-2">
                FitEats
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'text-[#ffc107] font-medium' 
                    : 'text-gray-300 hover:text-[#ffc107]'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc107]"/>
                )}
              </Link>
            ))}
          </div>
          
          {/* Cart and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/cart" className="relative p-2">
              <div className="relative p-1 rounded-md hover:bg-[#2c2c54] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ffc107] text-[#1a1a2e] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                {/* Custom Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#ffc107] overflow-hidden"
                  >
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </button>
                  
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2c2c54] rounded-lg shadow-xl py-2 z-50"
                        onMouseLeave={() => setIsProfileDropdownOpen(false)}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                        
                        <Link
                          to="/orderhistory"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v2m0 4v2a2 2 0 002 2h2m4-10h2a2 2 0 012 2v2m0 4v2a2 2 0 01-2 2h-2" />
                          </svg>
                          Order History
                        </Link>
                        
                        <div className="border-t border-[#2c2c54] my-2"></div>
                        <button
                          onClick={handleManageAccount}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          </svg>
                          Manage Account
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Hidden Clerk UserButton for functionality */}
                <div className="hidden">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="btn btn-outline text-sm px-4 py-1.5">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary text-sm px-4 py-1.5">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button and Profile Picture */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Icon for Mobile */}
            <Link to="/cart" className="relative p-2" onClick={() => setIsMenuOpen(false)}>
              <div className="relative p-1 rounded-md hover:bg-[#2c2c54] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ffc107] text-[#1a1a2e] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>

            {/* Profile Picture for Mobile */}
            {isSignedIn && (
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#ffc107] overflow-hidden"
              >
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 focus:outline-none p-2 rounded-md hover:bg-[#2c2c54] transition-colors"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Mobile Profile Dropdown - Separate from menu */}
            <AnimatePresence>
              {isProfileDropdownOpen && isSignedIn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2c2c54] rounded-lg shadow-xl py-2 z-50 md:hidden"
                >
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  
                  <Link
                    to="/orderhistory"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v2m0 4v2a2 2 0 002 2h2m4-10h2a2 2 0 012 2v2m0 4v2a2 2 0 01-2 2h-2" />
                    </svg>
                    Order History
                  </Link>
                  
                  <div className="border-t border-[#2c2c54] my-2"></div>
                  <button
                    onClick={handleManageAccount}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    Manage Account
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107] transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 overflow-hidden bg-[#1a1a2e] rounded-xl border border-[#2c2c54] shadow-lg"
            >
              <div className="py-2">
                {/* Main Navigation Items */}
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-4 py-3 transition-all duration-200 ${
                        isActive(item.path) 
                          ? 'text-[#ffc107] bg-[#2c2c54] font-medium border-r-2 border-[#ffc107]' 
                          : 'text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54]/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>


                
                {/* Bottom Section */}
                <div className="border-t border-[#2c2c54] mt-2 pt-3 px-4 pb-2">
                  {isSignedIn ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={user?.imageUrl} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border-2 border-[#ffc107]"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{user?.firstName || 'User'}</p>
                          <p className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center px-3 py-1.5 text-sm text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54] rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <SignInButton mode="modal">
                        <button
                          className="flex-1 bg-transparent border border-[#ffc107] text-[#ffc107] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#ffc107] hover:text-[#1a1a2e] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </button>
                      </SignInButton>
                      
                      <SignUpButton mode="modal">
                        <button
                          className="flex-1 bg-[#ffc107] text-[#1a1a2e] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#e6ad06] transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;