import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";

export default function LandingPage() {
  return (
    <body className="bg-gray-100">
      <nav className="bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-white text-2xl font-bold">Occupational Health</a>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-white hover:text-yellow-300">Features</a></li>
              <li><a href="#pricing" className="text-white hover:text-yellow-300">Pricing</a></li>
              <li><a href="#contact" className="text-white hover:text-yellow-300">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Combat Occupational Diseases with Ease</h1>
          <p className="text-lg mb-8">Our software helps your company register exercises and employees create routines for
            a healthier workplace.</p>
          <a href="#contact"
            className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">Get
            Started</a>
        </div>
      </header>

      < FeaturesSection />
      < PricingSection />

      <section id="contact" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
          <p className="text-gray-700 mb-8">Have questions or want to learn more? Contact us today!</p>
          <a href="mailto:contact@yourcompany.com"
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">Email
            Us</a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Your Company. All Rights Reserved.</p>
        </div>
      </footer>
    </body>
  );
}