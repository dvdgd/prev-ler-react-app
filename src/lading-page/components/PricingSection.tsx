import { pricings } from "../data";

type PricingCardInput = {
  id: number;
  title: string;
  description: string;
  price: number;
  periodicy: string;
}

function PricingCard(props: PricingCardInput) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{props.title}</h3>
      <p className="text-gray-700">{props.description}</p>
      <p className="text-2xl font-semibold mt-4">R$ {props.price}/{props.periodicy}</p>
      <a href="#contact"
        className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-full mt-4 block">Get
        Started
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            pricings.map((p) =>
              <PricingCard
                id={p.id}
                title={p.title}
                description={p.description}
                price={p.price}
                periodicy={p.periodicy}
              />
            )
          }
        </div>
      </div>
    </section>
  );
}