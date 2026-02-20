import ServiceCard from "@/components/cards/ServiceCard";
import Link from "next/link";

const demoServices = [
  {
    name: "AC Repair & Installation",
    category: "Home Services",
    location: "Korba City",
    slug: "ac-repair-korba",
  },
  {
    name: "Electrician on Call",
    category: "Technical",
    location: "Balco Nagar",
    slug: "electrician-korba",
  },
  {
    name: "Plumbing Services",
    category: "Home Services",
    location: "Transport Nagar",
    slug: "plumber-korba",
  },
  {
    name: "Computer & Laptop Repair",
    category: "IT Services",
    location: "Niharika",
    slug: "computer-repair-korba",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black">
            Local <span className="text-orange-500">Services</span>
          </h2>

          <Link
            href="/services"
            className="text-sm text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoServices.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
