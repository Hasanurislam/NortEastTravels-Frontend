import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Home,
  MapPin,
  Car,
  User,
  LogOut,
  LogIn,
  UserPlus,
  X,
  Menu,
} from "lucide-react";
import useScrollDirection from "../hooks/useScrollDirection";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const direction = useScrollDirection();
  const topbarHeight = 40; // px ~ 2.5rem
  const isTopbarVisible = direction === "up";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Desktop Navigation - Same as before */}
      <nav
        className="hidden md:block fixed w-full bg-white/95 backdrop-blur-xl border-b border-black/5 z-40 transition-[top] duration-300"
        style={{ top: isTopbarVisible ? topbarHeight : 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Minimalist Premium Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Simple elegant logo mark */}
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black tracking-tight leading-none">
                  Northeast
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-none">
                  Travels
                </span>
              </div>
            </Link>

            {/* Clean Desktop Navigation */}
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/browse/hotels"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Hotels
              </Link>
              <Link
                to="/browse/tours"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Tours
              </Link>
              <Link
                to="/browse/cars"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                Cars
              </Link>

              {/* Subtle divider */}
              <div className="w-px h-6 bg-gray-200 mx-4"></div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Top Bar - Just Logo */}
      <nav className="md:hidden fixed top-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 z-40">
        <div className="px-6">
          <div className="flex items-center justify-center h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-black tracking-tight leading-none">
                  Northeast
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-none">
                  Travels
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      {/* Mobile Bottom Navigation - Instagram Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-black/5 z-40">
        <div className="flex items-center justify-around h-16 px-2">
          <Link
            to="/"
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            to="/browse/tours"
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs font-medium">Tours</span>
          </Link>

          <Link
            to="/browse/cars"
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <Car className="h-6 w-6" />
            <span className="text-xs font-medium">Cars</span>
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <LogIn className="h-6 w-6" />
              <span className="text-xs font-medium">Login</span>
            </Link>
          )}

          {/* Menu/More button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <Menu className="h-6 w-6" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Menu Panel */}
          <div className="absolute bottom-16 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                <Link
                  to="/browse/hotels"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">🏨</span>
                  </div>
                  <span className="font-medium">Hotels</span>
                </Link>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                )}

                {!user && (
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-white bg-black hover:bg-gray-800 rounded-xl transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Get Started</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Spacers */}
      {/* <div className="hidden md:block h-16"></div> */}
      {/* <div className="md:hidden h-16"></div> Top spacer for mobile */}
      {/* <div className="md:hidden h-16"></div> Bottom spacer for mobile */}
    </>
  );
}
