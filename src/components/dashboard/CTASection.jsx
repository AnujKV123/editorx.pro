import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join thousands of teams already writing better, together.
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Start collaborating today and experience the future of team writing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/register")} size="lg" variant="secondary" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
              Get Started for Free
            </Button>
            {/* <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all">
              Contact Sales
            </Button> */}
          </div>
          <p className="text-sm mt-4 opacity-75">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;