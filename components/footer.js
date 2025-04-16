import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1D2A68] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="KICKOFF Logo" width={40} height={40} />
              <span className="text-2xl font-bold">KICKOFF</span>
            </div>
            <p className="mb-4">Your ultimate solution for soccer league management.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#2A9D58] transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-[#2A9D58] transition-colors duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-[#2A9D58] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-[#2A9D58] transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-[#2A9D58] transition-colors duration-300">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-[#2A9D58] transition-colors duration-300">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-[#2A9D58] transition-colors duration-300">Request Demo</Link></li>
              <li><Link href="/customers" className="hover:text-[#2A9D58] transition-colors duration-300">Customers</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="hover:text-[#2A9D58] transition-colors duration-300">Help Center</Link></li>
              <li><Link href="/blog" className="hover:text-[#2A9D58] transition-colors duration-300">Blog</Link></li>
              <li><Link href="/tutorials" className="hover:text-[#2A9D58] transition-colors duration-300">Tutorials</Link></li>
              <li><Link href="/api" className="hover:text-[#2A9D58] transition-colors duration-300">API Docs</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-[#2A9D58] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#2A9D58] transition-colors duration-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2A9D58] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#2A9D58] transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} KICKOFF Soccer League Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}