import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "Is this really free to start?",
    answer: "Yes! Our free plan includes 1 project with up to 5 collaborators and 7-day version history. You can upgrade anytime as your needs grow."
  },
  {
    question: "How does real-time editing work?",
    answer: "Our advanced conflict resolution system ensures that multiple people can edit the same document simultaneously without overwriting each other's work. You'll see live cursors and changes as they happen."
  },
  {
    question: "Can I export my documents?",
    answer: "Absolutely! You can export your documents in various formats including PDF, Word, Markdown, and HTML. Pro users get access to additional export formats and styling options."
  },
  {
    question: "Is my content secure?",
    answer: "Security is our top priority. All documents are encrypted in transit and at rest. We use enterprise-grade security measures and comply with industry standards like SOC 2 and GDPR."
  },
  {
    question: "Can I collaborate with people outside my organization?",
    answer: "Yes! You can invite anyone with an email address to collaborate on your documents. You have full control over permissions and can set different access levels for different users."
  },
  {
    question: "What happens if I go over my plan limits?",
    answer: "If you exceed your plan's limits, we'll notify you and give you options to upgrade or manage your usage. We never lock you out of your content - you'll always have access to view and export your documents."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions? We've got answers. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
