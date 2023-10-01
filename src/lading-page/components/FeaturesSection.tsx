import { features } from "../data";

type FeatureInput = {
  title: string, description: string
}

function FeatureCard({ title, description }: FeatureInput) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

export default function FeaturesSection() {

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            features.map((ft) =>
              <li key={ft.id}>
                <FeatureCard title={ft.title} description={ft.description} />
              </li>
            )
          }
        </ul>
      </div>
    </section>
  );
}