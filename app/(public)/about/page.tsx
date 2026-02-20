export default function AboutPage() {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black">
            About <span className="text-orange-500">Korba One</span>
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Building Korba’s most powerful digital ecosystem — connecting
            businesses, jobs, services and people in one unified platform.
          </p>
        </div>

        {/* Mission */}
        <div className="card-premium mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Our Mission
          </h2>
          <p className="text-white/70 leading-relaxed">
            Korba One exists to digitally empower local businesses and make
            every essential service in Korba accessible through a single,
            intelligent platform. We aim to simplify discovery, increase
            business visibility, and create meaningful connections between
            buyers and sellers.
          </p>
        </div>

        {/* Vision */}
        <div className="card-premium mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Our Vision
          </h2>
          <p className="text-white/70 leading-relaxed">
            Our vision is to become the digital backbone of Korba and expand
            across other cities — transforming local commerce into a powerful,
            tech-driven ecosystem. We believe every city deserves its own
            dedicated digital super app.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="card-premium mb-12">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Why Korba One?
          </h2>
          <p className="text-white/70 leading-relaxed">
            Local businesses often struggle with visibility and fragmented
            platforms. Buyers waste time searching across multiple websites.
            Korba One brings everything together — shops, jobs, services,
            buy/sell listings, and emergency contacts — in one seamless
            experience.
          </p>
        </div>

        {/* Founder Statement */}
        <div className="card-premium">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Founder’s Note
          </h2>
          <p className="text-white/70 leading-relaxed">
            Korba One was built with a simple belief — that local businesses
            deserve world-class digital tools. This platform is not just a
            directory; it is a movement toward a stronger, smarter, and more
            connected Korba.
          </p>
        </div>

      </div>
    </section>
  );
}
