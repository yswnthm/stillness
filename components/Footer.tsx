import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone text-cream pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-serif">Stillness.</Link>
            <p className="text-wave/60 text-sm font-light leading-relaxed max-w-xs">
              A sanctuary for the modern mind. Restoring balance through sensory reduction and nervous system regulation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-wave/60 hover:text-cream transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-wave/60 hover:text-cream transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-wave/60 hover:text-cream transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-seafoam mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/#intro" className="text-wave/80 hover:text-cream text-sm transition-colors">Our Philosophy</Link></li>
              <li><Link to="/#heal" className="text-wave/80 hover:text-cream text-sm transition-colors">The Experience</Link></li>
              <li><Link to="/about" className="text-wave/80 hover:text-cream text-sm transition-colors">About Us</Link></li>
              <li><Link to="/corporate" className="text-wave/80 hover:text-cream text-sm transition-colors">Corporate Wellness</Link></li>
              <li><Link to="/#stories" className="text-wave/80 hover:text-cream text-sm transition-colors">Journal</Link></li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-seafoam mb-6">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-wave/80 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>1240 Sanctuary Blvd, Suite 100<br/>Austin, TX 78704</span>
              </li>
              <li className="flex items-center gap-3 text-wave/80 text-sm">
                <Mail size={16} />
                <a href="mailto:hello@stillness.com" className="hover:text-cream transition-colors">hello@stillness.com</a>
              </li>
              <li className="flex items-center gap-3 text-wave/80 text-sm">
                <Phone size={16} />
                <span>(512) 555-0123</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-seafoam mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-wave/80 hover:text-cream text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-wave/80 hover:text-cream text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-wave/80 hover:text-cream text-sm transition-colors">Waiver</a></li>
              <li><a href="#" className="text-wave/80 hover:text-cream text-sm transition-colors">Accessibility</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-wave/40">
          <p>&copy; {new Date().getFullYear()} Stillness Wellness Co. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Deep Rest.</p>
        </div>
      </div>
    </footer>
  );
};
