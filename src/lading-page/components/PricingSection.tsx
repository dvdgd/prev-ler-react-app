import { useEffect, useState } from "react";
import { supabaseClient } from "../../config/supabase";

type PricingCardInput = {
  id: number;
  title: string;
  description: string;
  price: number;
  periodicy: string;
}

type PlanoResponse = {
  id_plano: number;
  titulo: string;
  descricao: string;
  valor_plano: number;
  periodicidade: string;
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

  const [pricings, setPrincings] = useState<PricingCardInput[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data } = await supabaseClient
      .from('plano')
      .select()
      .order('valor_plano', { ascending: true });

    const pricings: PricingCardInput[] | undefined = data?.map((p: PlanoResponse) => {
      return {
        id: p.id_plano,
        title: p.titulo,
        price: p.valor_plano,
        description: p.descricao,
        periodicy: p.periodicidade,
      };
    });

    if (pricings) {
      setPrincings([...pricings]);
    }
  }

  return (
    <section id="pricing" className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Preços</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            pricings.length > 0 ? pricings.map((p) => (
              <li key={p.id}>
                <PricingCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                  periodicy={p.periodicy}
                />
              </li>
            )) : []
          }
        </ul>
      </div>
    </section>
  );
}