import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";

export default function LandingPage() {
  return (
    <main className="bg-gray-100">
      <nav className="bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex justify-center">
              <a href="#" className="text-white text-2xl font-bold">
                <img src="src/assets/Logo Prevler.png" alt="Logo da Prevler" className="h-12" />
                Prevler
              </a>
            </div>
            <ul className="flex space-x-4">
              <li><a href="#features" className="text-white hover:text-yellow-300">Funcionalidades</a></li>
              <li><a href="#pricing" className="text-white hover:text-yellow-300">Planos</a></li>
              <li><a href="#contato" className="text-white hover:text-yellow-300">Contato</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Sistema de gestão e prevenção a Lesões por Esforço Repetitivo</h1>
          <p className="text-lg mb-8">Nosso sistema auxilia sua empresa a melhorar a saúde dos funcionários, permitindo que eles criem rotinas de exercícios para promover um ambiente de trabalho mais saudável.</p>
          <a href="#contato"
            className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">Comece já</a>
        </div>
      </header>

      < FeaturesSection />
      < PricingSection />

      <section id="contato" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Contate-nos</h2>
          <p className="text-gray-700 mb-8">Tem alguma dúvida ou deseja saber mais? Entre em contato conosco hoje mesmo!</p>
          <a href="mailto:contatos@PrevlerLabs.com"
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105">Enviar 
            Email</a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 PrevlerLabs. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}