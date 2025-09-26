import React, { useState } from "react";
import {
  Home,
  Settings,
  Users,
  BookOpen,
  Gift, // for Offers icon, use Gift from lucide-react
  Menu,
  X
} from "lucide-react";

import AdminDashboard from "../pages/AdminDashboard";
import AdminHotels from "../pages/AdminBookings";  // Adjust import paths accordingly
import AdminCars from "../pages/AdminCars";
import AdminTours from "../pages/AdminTours";
import AdminOffers from "../pages/AdminOffersPage";

const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "manage-hotels", label: "Manage Hotels", icon: Settings },
    { id: "manage-cars", label: "Manage Cars", icon: Settings },
    { id: "manage-tours", label: "Manage Tours", icon: Settings },
    { id: "manage-offers", label: "Manage Offers", icon: Gift },
  ];

  return (
    <div
      className={`bg-gray-800 text-white w-64 min-h-screen transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static z-30`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => {
                  setActiveTab(id);
                  if (isOpen) toggleSidebar();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded ${
                  activeTab === id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                } transition-colors duration-200`}
              >
                <Icon className="w-5 h-5" /> <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">Travel Admin</h1>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-sm text-gray-600">Welcome, Admin</div>
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
        A
      </div>
    </div>
  </nav>
);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "manage-hotels":
        return <AdminHotels />;
      case "manage-cars":
        return <AdminCars />;
      case "manage-tours":
        return <AdminTours />;
      case "manage-offers":
        return <AdminOffers />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-grow overflow-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
