import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './index.css';

// Layout
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import RecipePage from './pages/RecipePage';
import FoodsPage from './pages/FoodPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import PreferencesForm from './components/ui/PreferencesForm';
import AuthRedirector from './components/AuthRedirector';

// Admin Components
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import RestaurantsManagementPage from './pages/admin/RestaurantsManagementPage';
import FoodsManagementPage from './pages/admin/FoodsManagementPage';
import OrdersManagementPage from './pages/admin/OrdersManagementPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

// Context Providers
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />

          <Routes>
            {/* Admin Routes - Outside main layout */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/restaurants" element={
              <AdminProtectedRoute>
                <RestaurantsManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/foods" element={
              <AdminProtectedRoute>
                <FoodsManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminProtectedRoute>
                <OrdersManagementPage />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <AdminProtectedRoute>
                <UsersManagementPage />
              </AdminProtectedRoute>
            } />

            {/* Auth redirector - handles post-login flow - OUTSIDE LAYOUT */}
            <Route 
              path="auth-redirect" 
              element={
                <>
                  <SignedIn>
                    <AuthRedirector />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />

            {/* Main App Routes with Layout */}
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<HomePage />} />
              <Route path="restaurants" element={<RestaurantsPage />} />
              <Route path="restaurants/:id" element={<RestaurantMenuPage />} />
              <Route path="recipe/:id" element={<RecipePage />} />
              <Route path="foods" element={<FoodsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="about" element={<AboutPage />} />
              
              {/* Protected routes */}
            <Route 
              path="cart" 
              element={
                <>
                  <SignedIn>
                    <CartPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="order-success" 
              element={
                <>
                  <SignedIn>
                    <OrderSuccessPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="profile" 
              element={
                <>
                  <SignedIn>
                    <ProfilePage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="orderhistory"
              element={
                <>
                  <SignedIn>
                    <OrderHistoryPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="order/:orderId"
              element={
                <>
                  <SignedIn>
                    <OrderDetailsPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="preferences" 
              element={
                <>
                  <SignedIn>
                    <PreferencesForm />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;