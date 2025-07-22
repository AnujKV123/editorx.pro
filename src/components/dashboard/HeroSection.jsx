import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Users, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              🚀 Real-time collaboration reimagined
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Write Together.<br />Create Faster.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A real-time collaborative text editor for teams, creators, and innovators. 
              Experience seamless collaboration like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button onClick={() => navigate("/register")} size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                Start for Free
              </Button>
              {/* <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                See Live Demo
              </Button> */}
            </div>
          </div>

          {/* Mock Editor Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-2xl bg-white/80 backdrop-blur-sm border-0 hover:shadow-3xl transition-shadow duration-300">
              {/* Editor Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 font-semibold text-gray-700">Project Proposal - Marketing Team</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarFallback className="bg-green-500 text-white text-xs">SM</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarFallback className="bg-purple-500 text-white text-xs">AL</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Link className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* Editor Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">3 people editing</span>
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">Q1 Marketing Strategy</h2>
                  <p className="text-gray-700 mb-4">
                    Our primary focus for Q1 will be on expanding our digital presence and 
                    <span className="bg-yellow-200 px-1 rounded">increasing brand awareness</span> 
                    through strategic content marketing initiatives.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                    <p className="text-blue-800 italic">
                      "Sarah is typing..." 
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Social media campaign launch
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Content calendar development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Influencer partnerships
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;