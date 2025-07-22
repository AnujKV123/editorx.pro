import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">CollabEdit</h3>
            <p className="text-gray-400">
              The future of collaborative writing. Real-time editing that brings teams together.
            </p>
            <div className="flex space-x-4">
              <Link to={"https://x.com/Anuj_Verma___"} target="_blank">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={"https://github.com/AnujKV123"} target="_blank">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={"https://www.linkedin.com/in/anujverma11/"} target="_blank">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
              <Link to={"mailto:anuj8ranchi@gmail.com"} target="_blank">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to={"#"} className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to={"#"}  className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to={"#"}  className="hover:text-white transition-colors">Enterprise</Link></li>
              <li><Link to={"#"}  className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to={"#"} className="hover:text-white transition-colors">About</Link></li>
              <li><Link to={"#"} className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to={"#"} className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to={"#"} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-400 text-sm">
              Get the latest updates and features delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 editorX.pro . All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <Link to={"#"} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to={"#"} className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to={"#"} className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;