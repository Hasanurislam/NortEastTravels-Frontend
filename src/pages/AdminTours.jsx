import { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { 
  Plus, 
  X, 
  Edit2, 
  Trash2, 
  Upload, 
  DollarSign, 
  Calendar, 
  MapPin,
  Image as ImageIcon,
  Save,
  XCircle,
  Package,
  FileText,
  Star
} from "lucide-react";

export default function AdminTours() {
  const { user } = useContext(AuthContext);
  const [tours, setTours] = useState([]);

  // Form state
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    highlights: [],
    itinerary: "",
    type: "General",
  });
  const [highlightInput, setHighlightInput] = useState("");
  const [images, setImages] = useState([]);

  // For editing mode
  const [editingTourId, setEditingTourId] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await axiosClient.get("/api/tours");
      setTours(res.data.results || []);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
      setTours([]);
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const addHighlight = () => {
    const trimmed = highlightInput.trim();
    if (trimmed && !newTour.highlights.includes(trimmed)) {
      setNewTour((prev) => ({
        ...prev,
        highlights: [...prev.highlights, trimmed],
      }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) => {
    setNewTour((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setNewTour({
      title: "",
      description: "",
      duration: "",
      price: "",
      highlights: [],
      itinerary: "",
      type: "General",
    });
    setHighlightInput("");
    setImages([]);
    setEditingTourId(null);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newTour.title);
      formData.append("description", newTour.description);
      formData.append("duration", newTour.duration);
      formData.append("price", newTour.price);
      formData.append("itinerary", newTour.itinerary);
      formData.append("type", newTour.type);
      formData.append("highlights", JSON.stringify(newTour.highlights));

      images.forEach((imageFile) => {
        formData.append("images", imageFile);
      });

      if (editingTourId) {
        // Update existing tour
        await axiosClient.put(`/api/tours/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        // Create new tour
        await axiosClient.post("/api/tours", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        });
      }

      resetForm();
      fetchTours();
    } catch (error) {
      console.error("Failed to create or update tour:", error);
    }
  };

  const startEditing = (tour) => {
    setEditingTourId(tour._id);
    setNewTour({
      title: tour.title || "",
      description: tour.description || "",
      duration: tour.duration || "",
      price: tour.price || "",
      highlights: tour.highlights || [],
      itinerary: tour.itinerary || "",
      type: tour.type || "General",
    });
    setHighlightInput("");
    setImages([]); // Optionally clear images; user can add new ones
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // If deleting currently edited tour, reset form
      if (id === editingTourId) resetForm();
      fetchTours();
    } catch (error) {
      console.error("Failed to delete tour:", error);
    }
  };

  const typeColors = {
    General: "bg-blue-100 text-blue-800",
    Adventure: "bg-green-100 text-green-800",
    Honeymoon: "bg-pink-100 text-pink-800",
    Family: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Tour Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage your tour packages</p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              {editingTourId ? (
                <>
                  <Edit2 className="w-5 h-5 text-blue-600" />
                  Edit Tour
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-green-600" />
                  Create New Tour
                </>
              )}
            </h2>
            {editingTourId && (
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Cancel editing"
              >
                <XCircle className="w-6 h-6" />
              </button>
            )}
          </div>

          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package className="w-4 h-4 inline mr-1" />
                  Tour Title
                </label>
                <input
                  type="text"
                  placeholder="Enter tour title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newTour.title}
                  onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newTour.type}
                  onChange={(e) => setNewTour({ ...newTour, type: e.target.value })}
                >
                  <option value="General">General</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Family">Family</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Description
              </label>
              <input
                type="text"
                placeholder="Brief description of the tour"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={newTour.description}
                onChange={(e) =>
                  setNewTour({ ...newTour, description: e.target.value })
                }
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 3 days 2 nights"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newTour.duration}
                  onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={newTour.price}
                  onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Itinerary
              </label>
              <textarea
                placeholder="Day-by-day itinerary details..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="4"
                value={newTour.itinerary}
                onChange={(e) => setNewTour({ ...newTour, itinerary: e.target.value })}
              />
            </div>

            {/* Highlights Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Tour Highlights
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a highlight"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHighlight();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {newTour.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                  {newTour.highlights.map((highlight, i) => (
                    <div
                      key={i}
                      className="bg-white px-3 py-2 rounded-full flex items-center gap-2 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm">{highlight}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        aria-label={`Remove highlight ${highlight}`}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Tour Images
              </label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {images.length > 0 ? `${images.length} image(s) selected` : "PNG, JPG up to 10MB"}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                {editingTourId ? "Update Tour" : "Create Tour"}
              </button>
              {editingTourId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tours List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Existing Tours</h2>
          
          {tours.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No tours found. Create your first tour above!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tours.map((t) => (
                <div
                  key={t._id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image */}
                    {t.images && t.images.length > 0 && (
                      <div className="md:w-48 h-32 md:h-32 flex-shrink-0">
                        <img
                          src={`http://localhost:5000${t.images[0]}`}
                          alt={t.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* Tour Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${typeColors[t.type] || typeColors.General} mt-1`}>
                            {t.type}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(t)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            aria-label={`Edit tour ${t.title}`}
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label={`Delete tour ${t.title}`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{t.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{t.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-700">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">₹{t.price}</span>
                        </div>
                        {t.highlights && t.highlights.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-700">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span>{t.highlights.length} highlights</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}