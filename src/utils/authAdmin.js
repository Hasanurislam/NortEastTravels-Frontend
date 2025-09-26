// src/utils/authAdmin.js
const ADMIN_EMAIL = "sam@admin.com";
const ADMIN_PASSWORD = "Sam@admin"; // again: don't keep plain passwords in production

export function isAdminLoggedIn() {
  try {
    return localStorage.getItem("isAdmin") === "true";
  } catch {
    return false;
  }
}

export function loginAdmin({ email, password }) {
  // simple client-side check
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("isAdmin", "true");
    return { ok: true };
  }
  return { ok: false, message: "Invalid credentials" };
}

export function logoutAdmin() {
  localStorage.removeItem("isAdmin");
}
