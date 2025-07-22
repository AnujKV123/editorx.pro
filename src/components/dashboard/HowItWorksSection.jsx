import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FileText, UserPlus, Users } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Create a Document",
    description: "Start with a blank document or choose from our templates. Give it a name and you're ready to go.",
    step: "01"
  },
  {
    icon: UserPlus,
    title: "Invite Collaborators",
    description: "Share your document with team members using email invites or direct links. Set permissions as needed.",
    step: "02"
  },
  {
    icon: Users,
    title: "Start Editing Together",
    description: "Watch as changes appear in real-time. See who's editing what with live cursors and user presence.",
    step: "03"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started in minutes. It's as simple as create, invite, and collaborate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;