
import { Link, useLocation } from "react-router-dom";

export default function Inbox() {

const location = useLocation();
  const { phoneNumber, email } = location.state || {};
const tabs = [
  { label: "My Applications", path: "/my-applications" },
  { label: "New Application", path: "/new-application" },
  { label: "Payments", path: "/payments" },
  { label: "My Documents", path: "/my-documents" },
  { label: "Notification", path: "/notification" },
  { label: "My Building", path: "/my-building" },
  { label: "My Profile", path: "/my-profile" },
];

  

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow px-6 py-3 flex justify-between items-right border-b">
        <div className="flex items-center space-x-2">
          <img src="/ksmart-logo.png" alt="KSmart" className="h-8" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-semibold">{phoneNumber}</span>
          <button className="text-gray-600">
            <i className="fas fa-user-circle text-xl"></i>
          </button>
          <button className="text-gray-600">
            <i className="fas fa-sync-alt text-xl"></i>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b px-4 py-2 flex justify-center items-center space-x-6" >
        {[
          "My Applications",
          "New Application",
          "Payments",
          "My Documents",
          "Notification",
          "My Building",
          "My Profile",
        ].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-1 pb-1 ${
              item === "My Applications"
                ? "border-b-2 border-pink-500 text-pink-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{item}</span>
          </div>
        ))}
      </nav>

      {/* Body */}
      <div className="flex flex-1 bg-blue-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4">
          <h3 className="text-lg font-semibold mb-4">My Applications</h3>
          <ul className="space-y-2">
            {[
              { name: "Property Tax", count: 0 },
              { name: "Others", count: 0 },
              { name: "Building Cess", count: 0 },
            ].map((item, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center px-4 py-2 rounded ${
                  item.name === "Property Tax"
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{item.name}</span>
                <span className="text-sm bg-white rounded-full px-2 py-0.5">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white rounded-lg shadow-inner m-4">
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
            <img
              src="/empty-services.svg"
              alt="No services"
              className="w-48 mb-4"
            />
            <p className="text-lg font-medium mb-2">
              You don’t have any services added.
            </p>
            <p className="text-sm text-blue-700">
              The services you have added will be listed here
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-xs text-gray-500 text-center py-2 border-t">
        Copyright © 2025, KSmart, Government of Kerala.{" "}
        <span className="mx-2">|</span>
        <a href="#" className="underline">
          Terms & Conditions
        </a>{" "}
        <span className="mx-2">|</span>
        <a href="#" className="underline">
          Privacy & Policy
        </a>
      </footer>
    </div>
  );
}