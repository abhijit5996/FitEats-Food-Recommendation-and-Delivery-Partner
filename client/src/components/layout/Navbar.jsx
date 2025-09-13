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
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const handleSignOut = () => {
    signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleManageAccount = () => {
    openUserProfile();
    setIsProfileDropdownOpen(false);
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
                      <div
                        className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2c2c54] rounded-md shadow-lg py-1 z-50"
                        onMouseLeave={() => setIsProfileDropdownOpen(false)}
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        
                        <Link
                          to="/orderhistory"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Order History
                        </Link>
                        
                        <div className="border-t border-[#2c2c54] my-1"></div>
                        <button
                          onClick={handleManageAccount}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                        >
                          Manage Account
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                        >
                          Sign Out
                        </button>
                      </div>
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
                
               
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button and Profile Picture */}
          <div className="md:hidden flex items-center">
            {/* Profile Picture for Mobile */}
            {isSignedIn ? (
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#ffc107] overflow-hidden mr-2"
              >
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
            ) : (
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-600 overflow-hidden mr-2 bg-[#2c2c54]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 focus:outline-none p-1 rounded-md hover:bg-[#2c2c54] transition-colors"
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
            
            {/* Mobile Profile Dropdown */}
            <AnimatePresence>
              {isProfileDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2c2c54] rounded-md shadow-lg py-1 z-50 md:hidden"
                >
                  {isSignedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      
                      <Link
                        to="/orderhistory"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Order History
                      </Link>
                      
                      <div className="border-t border-[#2c2c54] my-1"></div>
                      <button
                        onClick={handleManageAccount}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                      >
                        Manage Account
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2c2c54] hover:text-[#ffc107]"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Login
                        </button>
                      </SignInButton>
                      
                     
                    </>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <div className="md:hidden mt-3 overflow-hidden bg-[#1a1a2e] rounded-lg border border-[#2c2c54]">
              <div className="flex flex-col space-y-1 py-3">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2.5 transition-colors duration-200 ${
                      isActive(item.path) 
                        ? 'text-[#ffc107] bg-[#2c2c54] font-medium' 
                        : 'text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isSignedIn && (
                  <>
                    <Link 
                      to="/profile"
                      className="px-4 py-2.5 text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/orderhistory"
                      className="px-4 py-2.5 text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={handleManageAccount}
                      className="px-4 py-2.5 text-left text-gray-300 hover:text-[#ffc107] hover:bg-[#2c2c54] transition-colors duration-200"
                    >
                      Manage Account
                    </button>
                  </>
                )}
                
                <div className="flex items-center justify-between px-4 pt-3 pb-2 border-t border-[#2c2c54] mt-2">
                  <Link to="/cart" className="relative p-2" onClick={() => setIsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#ffc107] text-[#1a1a2e] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  
                  {isSignedIn ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSignOut}
                        className="btn btn-outline text-sm px-3 py-1.5"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <SignInButton mode="modal">
                        <button
                          className="btn btn-outline text-sm px-3 py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </button>
                      </SignInButton>
                      
                      <SignUpButton mode="modal">
                        <button
                          className="btn btn-primary text-sm px-3 py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;