import React, { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient"; // Using centralized axios client
import { AuthContext } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminAnalytics() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [carDist, setCarDist] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    if (!user?.token) return;
    const headers = { Authorization: `Bearer ${user.token}` };
    try {
      const statsRes = await axiosClient.get("/api/admin/stats", { headers });
      const monthlyRes = await axiosClient.get("/api/admin/monthly-bookings", { headers });
      const carRes = await axiosClient.get("/api/admin/car-distribution", { headers });

      setStats(statsRes.data);
      setMonthly(
        monthlyRes.data.map((m) => ({
          name: `${m._id.month}/${m._id.year}`,
          count: m.count,
        }))
      );
      setCarDist(carRes.data.map((c) => ({ name: c._id, value: c.count })));
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-200 p-4 rounded text-center">
          <b>Tours:</b> {stats.totalTours}
        </div>
        <div className="bg-green-200 p-4 rounded text-center">
          <b>Cars:</b> {stats.totalCars}
        </div>
        <div className="bg-yellow-200 p-4 rounded text-center">
          <b>Bookings:</b> {stats.totalBookings}
        </div>
      </div>

      {/* Monthly Bookings Bar Chart */}
      <h3 className="text-xl font-semibold mb-3">Monthly Bookings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthly}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>

      {/* Car Distribution Pie Chart */}
      <h3 className="text-xl font-semibold mt-6 mb-3">Car Type Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={carDist}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {carDist.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
