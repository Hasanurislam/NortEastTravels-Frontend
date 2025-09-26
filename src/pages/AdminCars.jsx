import React, { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient"; 

import { AuthContext } from "../context/AuthContext";
import { PlusCircle, Trash2, Car, LoaderCircle } from "lucide-react";

export default function AdminCars() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    tagline: "",
    carType: "",
    engineType: "",
    transmission: "Automatic",
    seatCapacity: "",
    price: "",
    image: "", // image URL returned by backend
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const carTypeOptions = ["Luxury", "Economy", "Electric", "SUV"];
  const engineTypeOptions = ["Petrol", "Diesel", "Electric"];

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axiosClient.get("/api/cars");

      if (Array.isArray(res.data)) {
        setCars(res.data);
      } else if (Array.isArray(res.data?.results)) {
        setCars(res.data.results);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Failed to fetch cars:", error);
      setCars([]);
    }
  };
   
   async function uploadImage(file) {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
     await axiosClient.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.token}` }
      });
      setNewCar(prev => ({ ...prev, image: res.data.url }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
      setImagePreview(null);
      setNewCar(prev => ({ ...prev, image: "" }));
    } finally {
      setUploading(false);
    }
  }
  // Handle local image selection -> preview + upload
  const handleLocalImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    // Preview locally
    setImagePreview(URL.createObjectURL(file));
    // Upload to server
    uploadImage(file);
  };

  // Upload image file to backend and update state with returned URL
  async function uploadImage(file) {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosClient.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setNewCar((prev) => ({ ...prev, image: res.data.url }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
      setImagePreview(null);
      setNewCar((prev) => ({ ...prev, image: "" }));
    } finally {
      setUploading(false);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, tagline, carType, engineType, transmission, seatCapacity, price, image } = newCar;

    if (!name || !tagline || !carType || !engineType || !transmission || !seatCapacity || !price) {
      alert("Please fill in all fields");
      return;
    }
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);
    try {
     await axiosClient.post("/api/cars",
        {
          name,
          tagline,
          carType,
          engineType,
          transmission,
          seatCapacity: Number(seatCapacity),
          price: Number(price),
          images: [image], // Wrap in array per your schema
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setNewCar({
        name: "",
        tagline: "",
        carType: "",
        engineType: "",
        transmission: "Automatic",
        seatCapacity: "",
        price: "",
        image: "",
      });
      setImagePreview(null);
      fetchCars();
    } catch (error) {
      console.error("Failed to create car:", error);
      alert("Error creating car.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axiosClient.delete(`/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCars();
    } catch (error) {
      console.error("Failed to delete car:", error);
      alert("Error deleting car.");
    }
  };

  const toggleAvailability = async (id, current) => {
    try {
      await axiosClient.put(`/api/cars/${id}`,
        { availability: !current },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchCars();
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      alert("Error toggling availability.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-4">
            <Car size={42} className="text-indigo-600" />
            <span>Manage Vehicles</span>
          </h1>
          <p className="text-slate-600 mt-2 max-w-lg">
            Add, update, and manage the fleet.
          </p>
        </header>

        {/* Add New Vehicle Form */}
        <div className="bg-white p-8 rounded-xl shadow border border-slate-200 mb-12">
          <h2 className="text-2xl font-semibold text-slate-700 flex items-center gap-3 mb-6">
            <PlusCircle size={24} className="text-indigo-600" />
            Add a New Vehicle
          </h2>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input type="text" placeholder="Car Name (e.g., Toyota Camry)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} required />

              <input type="text" placeholder="Tagline (e.g., Comfort & Style)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.tagline} onChange={e => setNewCar({...newCar, tagline: e.target.value})} required />

              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.carType}
                onChange={e => setNewCar({...newCar, carType: e.target.value})}
                required
              >
                <option value="" disabled>Select Car Type</option>
                <option>Luxury</option>
                <option>Economy</option>
                <option>Electric</option>
                <option>SUV</option>
              </select>

              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.engineType}
                onChange={e => setNewCar({...newCar, engineType: e.target.value})}
                required
              >
                <option value="" disabled>Select Engine Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
              </select>

              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.transmission}
                onChange={e => setNewCar({...newCar, transmission: e.target.value})}
                required
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>

              <input type="number" placeholder="Seat Capacity" min="1"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.seatCapacity} onChange={e => setNewCar({...newCar, seatCapacity: e.target.value})} required />

              <input type="number" placeholder="Price Per Day"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} required />

              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-slate-700">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleLocalImageChange}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {uploading ? (
                  <div className="mt-3 flex items-center space-x-2 text-indigo-700 font-semibold">
                    <LoaderCircle className="animate-spin" size={20} /> Uploading...
                  </div>
                ) : imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="mt-3 w-full max-h-48 object-contain rounded-md border border-gray-300" />
                ) : (
                  <div className="mt-3 w-full h-48 flex items-center justify-center rounded-md border border-gray-300 text-gray-400">
                    Preview will appear here
                  </div>
                )}
              </div>
            </div>

            <button type="submit"
              disabled={loading || uploading}
              className={`w-full py-3 mt-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition 
                ${loading || uploading ? "opacity-60 cursor-not-allowed" : ""}`}>
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600 min-w-[700px]">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3">Car Name</th>
                <th className="px-6 py-3">Specifications</th>
                <th className="px-6 py-3 text-right">Price/Day</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length ? cars.map(car => (
                <tr key={car._id} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 flex items-center gap-4">
                    {car.image ? (
                      <img src={car.image} alt={car.name} className="w-16 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <Car />
                      </div>
                    )}
                    {car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{car.carType} • {car.engineType} • {car.transmission} • {car.seatCapacity} seats</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap font-semibold">₹{car.price.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button onClick={() => toggleAvailability(car._id, car.availability)}
                      className={`px-4 py-1 rounded-full font-semibold transition-colors ${car.availability ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}>
                      {car.availability ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <button onClick={() => handleDelete(car._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-gray-500">
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

 
}
