import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            We are passionate developers creating modern, user-friendly web applications.  
            Delivering quality and performance in every project.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a></li>
            <li>Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></li>
            <li>Address: Panigaon JyotiNagar, Nagaon, Assam</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}

