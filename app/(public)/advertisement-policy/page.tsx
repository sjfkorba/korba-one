export default function AdvertisementPolicyPage() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-black mb-10">
          Advertisement <span className="text-orange-500">Policy</span>
        </h1>

        <div className="space-y-8 text-white/70 leading-relaxed">

          <p>
            This policy outlines the rules for promotional and sponsored
            listings on Korba One.
          </p>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Sponsored Listings
            </h2>
            <p>
              Sponsored or featured listings may receive higher visibility on
              the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Accuracy Requirement
            </h2>
            <p>
              All advertisements must be truthful, accurate, and comply with
              Indian laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Restricted Categories
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Illegal products</li>
              <li>Fraudulent schemes</li>
              <li>Adult or explicit content</li>
              <li>Political propaganda (unless approved)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Approval Rights
            </h2>
            <p>
              Korba One reserves the right to approve, reject, or remove
              advertisements at its sole discretion.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
