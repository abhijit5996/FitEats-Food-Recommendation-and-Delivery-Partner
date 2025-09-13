import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ cartItems = [] }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a2e]">
      <Navbar cartItems={cartItems} />
      
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a2e',
            color: '#ffffff',
            border: '1px solid #2c2c54',
          },
          success: {
            iconTheme: {
              primary: '#ffc107',
              secondary: '#1a1a2e',
            },
          },
        }}
      />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;