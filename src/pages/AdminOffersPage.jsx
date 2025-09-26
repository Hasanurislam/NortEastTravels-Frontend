import React, { useState, useEffect, useContext } from "react";
import axiosClient from "../Api/axiosClient";

import {
  PlusCircle,
  Edit,
  Trash2,
  LoaderCircle,
  AlertTriangle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function AdminOffersPage() {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const initialForm = {
    title: "",
    subtitle: "",
    description: "",
    type: "",
    duration: "",
    features: "",
    discount: "",
    price: "",
    originalPrice: "",
    image: "",
    validTill: "",
  };
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("/api/offers", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setOffers(res.data.offers || []);
    } catch {
      setError("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchOffers();
    }
  }, [user]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (["price", "originalPrice", "discount"].includes(name)) {
      value = value.replace(/[^\d.]/g, "");
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setSaving(true);
    setFormError(null);

    try {
      const res = await axiosClient.post(
        "/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      // Changed res.data.imageUrl to res.data.url to match backend response
      setForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (error) {
      setFormError("Image upload failed");
    } finally {
      setSaving(false);
    }
  };

  const openModal = (offer = null) => {
    if (offer) {
      setEditingOffer(offer);
      setForm({
        title: offer.title || "",
        subtitle: offer.subtitle || "",
        description: offer.description || "",
        type: offer.type || "",
        duration: offer.duration || "",
        features: (offer.features || []).join(", "),
        discount: offer.discount != null ? offer.discount.toString() : "",
        price: offer.price != null ? offer.price.toString() : "",
        originalPrice: offer.originalPrice != null ? offer.originalPrice.toString() : "",
        image: offer.image || "",
        validTill: offer.validTill ? offer.validTill.split("T")[0] : "",
      });
    } else {
      setEditingOffer(null);
      setForm(initialForm);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingOffer(null);
    setForm(initialForm);
    setFormError(null);
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.price || isNaN(parseFloat(form.price)))
      return "Valid price is required";
    if (!form.originalPrice || isNaN(parseFloat(form.originalPrice)))
      return "Valid original price is required";
    return null;
  };

  const onSubmit = async () => {
    const err = validateForm();
    if (err) {
      setFormError(err);
      return;
    }
    setSaving(true);

    const payload = {
      ...form,
      discount: form.discount ? parseFloat(form.discount) : 0,
      price: parseFloat(form.price),
      originalPrice: parseFloat(form.originalPrice),
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      if (editingOffer) {
        await axiosClient.put(
          `/api/offers/${editingOffer._id}`,
          payload,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );

      } else {
        await axiosClient.post("/api/offers", payload, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
      }
      await fetchOffers();
      closeModal();
    } catch {
      setFormError("Failed to save offers. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this offer?")) return;
    try {
     await axiosClient.delete(`/api/offers/${id}`, {
  headers: { Authorization: `Bearer ${user?.token}` },
});

      await fetchOffers();
    } catch {
      alert("Failed to delete offer.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        <AlertTriangle className="w-10 h-10 mr-3" />
        {error}
      </div>
    );

  // Helper to build full image URL from backend path
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;

  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Manage Offers</h1>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow"
          >
            <PlusCircle />
            Add New
          </button>
        </div>

        {/* Inline Add/Edit form on top */}
        {modalOpen && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingOffer ? "Edit Offer" : "Add New Offer"}
            </h2>
            <div className="mb-3">
              <label htmlFor="title" className="block mb-1 font-semibold">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={onChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subtitle" className="block mb-1 font-semibold">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={form.subtitle}
                onChange={onChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="block mb-1 font-semibold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                rows={4}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-3 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block mb-1 font-semibold">
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={form.type}
                  onChange={onChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block mb-1 font-semibold">
                  Duration
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={form.duration}
                  onChange={onChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="features" className="block mb-1 font-semibold">
                Features (comma separated)
              </label>
              <input
                id="features"
                name="features"
                type="text"
                value={form.features}
                onChange={onChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-3 grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="discount" className="block mb-1 font-semibold">
                  Discount (%)
                </label>
                <input
                  id="discount"
                  name="discount"
                  type="text"
                  value={form.discount}
                  onChange={onChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="price" className="block mb-1 font-semibold">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={onChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="originalPrice"
                  className="block mb-1 font-semibold"
                >
                  Original Price
                </label>
                <input
                  id="originalPrice"
                  name="originalPrice"
                  type="text"
                  value={form.originalPrice}
                  onChange={onChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="block mb-1 font-semibold">
                Image URL / Upload
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded p-2 mb-2"
              />
              {form.image && (
                <img
                  src={getImageUrl(form.image)}
                  alt="Offer Preview"
                  className="w-full h-40 object-cover rounded"
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="validTill" className="block mb-1 font-semibold">
                Valid Till
              </label>
              <input
                id="validTill"
                name="validTill"
                type="date"
                value={form.validTill}
                onChange={onChange}
                className="w-full border rounded p-2"
              />
            </div>
            {formError && (
              <div className="text-red-600 mb-4 font-semibold">{formError}</div>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving
                  ? editingOffer
                    ? "Updating..."
                    : "Creating..."
                  : editingOffer
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white p-6 rounded shadow border flex flex-col"
            >
              <img
                src={getImageUrl(offer.image)}
                alt={offer.title || "Offer Image"}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{offer.subtitle}</p>
              <p className="text-sm text-gray-500 mb-2">{offer.type}</p>
              <div className="flex-grow" />
              <div className="flex gap-3">
                <button
                  onClick={() => openModal(offer)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(offer._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
