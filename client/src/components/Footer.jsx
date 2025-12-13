import { Link } from "react-router-dom";
import {
  PlayCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = {
    Support: [
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Terms of Service", path: "/terms-of-service" },
      { name: "Terms & Conditions", path: "/terms" },
    ],
    Watch: [
      { name: "Top Airing", path: "/top-airing" },
      { name: "Trending", path: "/trending" },
      { name: "New Releases", path: "/new-releases" },
      { name: "Popular", path: "/popular" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="bg-dark-100 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-400 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <PlayCircle className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">
                AnimeVerse
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Your ultimate destination for streaming the best anime content.
              Watch thousands of episodes and movies anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className={`p-2 bg-white/5 rounded-lg transition-colors ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4 text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <p className="text-gray-400 text-sm">
                Get the latest updates on new releases and features.
              </p>
            </div>
            {/* <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-dark-200 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 w-full md:w-64"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-r-lg font-semibold glow-button"
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </form> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} AnimeVerse. All rights reserved.
          </p>
          <p className="mt-2">Made with ❤️ for anime fans worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
