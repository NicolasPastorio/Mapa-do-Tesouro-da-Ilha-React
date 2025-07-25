import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            João Silva
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-200 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link to="/apps" className="hover:text-blue-200 transition-colors">
                Apps
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-200 transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-200 transition-colors">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

