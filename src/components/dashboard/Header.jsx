import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import Editorx from "../common/images/text-editor.png";
import { Link } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-xl text-gray-900 dark:text-white">
              <Link
                className="text-2xl flex flex-row justify-center items-center"
                to="/"
              >
                <img className="h-10" src={Editorx} alt="logo" />
                <span className="ml-1">editorX</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                FAQ
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="hidden md:inline-flex" onClick={() => navigate("/login")}  >
              Sign In
            </Button>
            <Button onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
