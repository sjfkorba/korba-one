import ProductCard from "@/components/cards/ProductCard";
import Link from "next/link";

const demoProducts = [
  {
    title: "iPhone 13 - Excellent Condition",
    price: "38,000",
    location: "Niharika, Korba",
    category: "Electronics",
    slug: "iphone-13-korba",
  },
  {
    title: "Royal Enfield Classic 350",
    price: "1,25,000",
    location: "Balco Nagar",
    category: "Vehicles",
    slug: "re-classic-350",
  },
  {
    title: "Wooden Study Table",
    price: "4,500",
    location: "Kosabadi",
    category: "Furniture",
    slug: "wooden-study-table",
  },
  {
    title: "2BHK Flat for Rent",
    price: "9,000 / month",
    location: "Transport Nagar",
    category: "Property",
    slug: "2bhk-flat-rent",
  },
];

export default function BuySellGrid() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black">
            Buy & <span className="text-orange-500">Sell</span>
          </h2>

          <Link
            href="/buy-sell"
            className="text-sm text-orange-500 hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoProducts.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
