import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Search } from 'lucide-react';

export default function SchoolFooter() {
  const [viewerCount, setViewerCount] = useState(() => {
    const savedCount = localStorage.getItem('viewerCount');
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    if (!sessionStorage.getItem('viewerIncremented')) {
      const updated = viewerCount + 1;
      localStorage.setItem('viewerCount', updated.toString());
      setViewerCount(updated);
      sessionStorage.setItem('viewerIncremented', 'true');
    }
  }, [viewerCount]);

  return (
    <footer className="bg-blue-900 text-white py-8 px-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* School Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Chanakya Hi-Tech Matric School</h2>
          <p className="text-sm italic">THINK DIFFERENT, DO BETTER</p>
          <p className="text-sm">📍Opposite Electric Power Station, Velur to Kabilarmalai Main Road, Pothanur-638181</p>
          <p className="text-sm">📞 Reception: <strong>9344567867</strong></p>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center space-y-4">
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/facilities" className="hover:underline">🏫 Facilities</Link></li>
              <li><Link to="/faculty" className="hover:underline">👨‍🏫 Faculty</Link></li>
              <li><Link to="/gallery" className="hover:underline">🎉 Events</Link></li>
              <li><Link to="/contact" className="hover:underline">📩 Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Designed By */}
        <div className="space-y-4">
          <p className="text-xl font-semibold">Designed & Developed By</p>
          <ul className="space-y-1 text-sm">
            <li>➤ Vishnupriya Ramar</li>
            <li>➤ Thesega P S</li>
            <li>➤ Sindhu kumar</li>
          </ul>
          <p className="text-sm">👁 Viewers: <strong>{viewerCount}</strong></p>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <Link to="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-300 mt-6">
            © 2025 Chanakya Hi-Tech Matric School. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
