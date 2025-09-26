import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); 

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errs.email = "Invalid email address";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData((fd) => ({ ...fd, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Placeholder for API call or email service integration
      // await sendContact(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        
        <aside className="lg:w-1/3 bg-white rounded-3xl p-10 shadow-lg flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-8">
            Have questions? Reach out to our travel experts — we're here to help
            you plan your perfect northeastern getaway.
          </p>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Phone</h3>
              <p className="mt-1">+91 9101221130</p>
              <p>+91 7636805190</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Email</h3>
              <p className="mt-1">support@northeasttravels.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Address</h3>
              <p className="mt-1">
                123 Adventure Road,
                <br />
                Guwahati, Assam, India
              </p>
            </div>
          </div>
        </aside>

        {/* Contact Form */}
        <form
          className="lg:w-2/3 bg-white rounded-3xl p-10 shadow-lg"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="text-3xl font-bold text-indigo-900 mb-8">Send a Message</h2>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 text-green-800 bg-green-100 rounded">
              Your message has been sent successfully. We will get back to you soon!
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 text-red-800 bg-red-100 rounded">
              Something went wrong. Please try again later.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="subject"
              className="block font-semibold text-gray-700 mb-2"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              type="text"
              className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.subject
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              placeholder="Subject of your message"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="block font-semibold text-gray-700 mb-2"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-lg shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
