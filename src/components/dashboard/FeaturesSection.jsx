import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Users, Link, History, FileText, Lock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "See changes instantly as your team edits. No more version conflicts or lost work."
  },
  {
    icon: Link,
    title: "Smart Invite System",
    description: "Invite collaborators with email or username lookup. Control access with precision."
  },
  {
    icon: History,
    title: "Version History & Autosave",
    description: "Never lose your work. Every change is saved automatically with full version history."
  },
  {
    icon: FileText,
    title: "Rich Text & Markdown",
    description: "Write in markdown or use our rich text editor. Export to any format you need."
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "End-to-end encryption ensures your documents stay private and secure."
  },
  {
    icon: RefreshCw,
    title: "Cross-device Syncing",
    description: "Start on your laptop, continue on your phone. Your work follows you everywhere."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to collaborate
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to make team collaboration seamless and productive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
