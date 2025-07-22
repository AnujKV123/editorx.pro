import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals and small projects",
    features: [
      "1 project",
      "5 collaborators max",
      "7-day version history",
      "Basic text editor",
      "Email support"
    ],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Best for growing teams and professionals",
    features: [
      "Unlimited projects",
      "Unlimited collaborators",
      "30-day version history",
      "Rich text & markdown",
      "Priority support",
      "Export to multiple formats",
      "Custom themes"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Team",
    price: "$24",
    period: "per user/month",
    description: "Advanced features for larger organizations",
    features: [
      "Everything in Pro",
      "Advanced permissions",
      "Audit logs",
      "SSO integration",
      "Custom branding",
      "API access",
      "24/7 phone support"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core collaboration features.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow duration-300 ${
              plan.popular ? 'border-blue-500 shadow-blue-100 dark:shadow-blue-900/20' : ''
            }`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div> */}

        <div className="flex justify-center">
  <div className="bg-blue-50 dark:bg-zinc-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700">
    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 tracking-wide animate-pulse">
      Coming Soon
    </p>
  </div>
</div>

      </div>
    </section>
  );
};

export default PricingSection;