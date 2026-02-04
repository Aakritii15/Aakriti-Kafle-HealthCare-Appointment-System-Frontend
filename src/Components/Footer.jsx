import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">HEALTHSEVA</h2>
          <p className="text-sm text-gray-400">
            Smart Healthcare Appointment System for seamless doctor–patient
            connection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/search-doctors" className="hover:text-white transition">
                Search Doctors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Patient & Doctor */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide mb-3">
            For Patients & Doctors
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400">
              Book, view and cancel appointments securely.
            </li>
            <li className="text-gray-400">
              Doctors can manage their schedule and view patient details.
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide mb-3">
            Contact
          </h3>
          <p className="text-sm text-gray-400">
            Email: support@healthseva.com
            <br />
            Phone: +977-9800000000
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>© {new Date().getFullYear()} HEALTHSEVA. All rights reserved.</span>
          <span>Built with React, Tailwind CSS, Node.js & MongoDB.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

