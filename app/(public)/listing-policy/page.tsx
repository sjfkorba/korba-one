export default function ListingPolicyPage() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-black mb-10">
          Listing <span className="text-orange-500">Policy</span>
        </h1>

        <div className="space-y-8 text-white/70 leading-relaxed">

          <p>
            This Listing Policy governs how users and sellers may publish
            content on Korba One.
          </p>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Eligibility
            </h2>
            <p>
              Only registered users may create listings. Sellers must provide
              accurate business or product information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Listing Duration
            </h2>
            <p>
              All listings remain active for 30 days from the date of
              publication unless removed earlier.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Free Listing Limit
            </h2>
            <p>
              Sellers may post up to 15 free listings per calendar month.
              Additional listings may require promotional or paid plans.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Prohibited Content
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Illegal goods or services</li>
              <li>Misleading or false information</li>
              <li>Duplicate listings</li>
              <li>Offensive or harmful content</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Moderation Rights
            </h2>
            <p>
              Korba One reserves the right to review, edit, suspend, or remove
              any listing that violates platform rules.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
