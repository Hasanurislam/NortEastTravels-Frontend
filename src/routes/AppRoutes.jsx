import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminLogin from "../pages/AdminLogin";
import AdminTours from "../pages/AdminTours";
import AdminCars from "../pages/AdminCars";
import AdminBookings from "../pages/AdminBookings";
import AdminAnalytics from "../pages/AdminAnalytics";
import ForgotPassword from "../pages/ForgotPassword";
import BrowseTours from "../pages/BrowseTours";
import Topbar from "../components/Topbar";
import FloatingCallButton from "../components/FloatingCallButton";
import ComingSoonPage from "../pages/ComingSoonPage";
import HotelBookingPage from "../pages/HotelBookingPage";
import CarBookingPage from "../pages/CarBookingPage";
import Admin from "../admin/Admin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
// Assuming the callback component is in the pages folder as per your import
import GoogleCallback from "../pages/CallBack"; 
import OfferDetailsPage from "../pages/OfferDetailsPage";
import ContactPage from "../pages/ContactPage";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const TourDetails = lazy(() => import("../pages/TourDetails"));
const CarDetails = lazy(() => import("../pages/CarDetails"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

// Layout wrapper to hide/show navbar & topbar based on route
function Layout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/auth/callback';


  // Don't show layout on full-page auth or admin routes
  if(isAdminRoute || isAuthRoute) {
      return <>{children}</>
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="min-h-screen pt-20">{children}</div>
      <FloatingCallButton />
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><p>Loading...</p></div>}>
        <Layout>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/offers/:offerId" element={<OfferDetailsPage />} />
            <Route path="/browse/tours" element={<BrowseTours />} />
            <Route path="/browse/cars" element={<CarBookingPage />} />
            <Route path="/contact" element={<ContactPage/>} />

            {/* Tour & Car details */}
            <Route path="/tour/:tourId" element={<TourDetails />} />
            <Route path="/car/:carId" element={<CarDetails />} />
            <Route path="/browse/hotels" element={<HotelBookingPage />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* --- GOOGLE OAUTH CALLBACK ROUTE --- */}
            <Route path="/auth/callback" element={<GoogleCallback />} />


            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/*" // Use /* to handle nested admin routes
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;