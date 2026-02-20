export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-black mb-10">
          Terms & <span className="text-orange-500">Conditions</span>
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">

          {/* Introduction */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Korba One, you agree to comply with and
              be bound by these Terms and Conditions. If you do not agree,
              please do not use the platform.
            </p>
          </div>

          {/* Platform Description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Platform Overview
            </h2>
            <p>
              Korba One is a digital platform that allows users to discover
              local shops, services, jobs, buy/sell listings, and emergency
              contacts. We provide listing and visibility services but are not
              directly involved in transactions between users.
            </p>
          </div>

          {/* User Accounts */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              3. User Accounts
            </h2>
            <p>
              Users must provide accurate and complete information when
              registering. You are responsible for maintaining the
              confidentiality of your account credentials.
            </p>
          </div>

          {/* Seller Rules */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Seller Listings & Rules
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Each seller may post up to 15 free listings per month.</li>
              <li>All listings are valid for 30 days from the date of posting.</li>
              <li>After 30 days, listings may become inactive or restricted.</li>
              <li>False, misleading, or illegal listings are strictly prohibited.</li>
              <li>Korba One reserves the right to remove any listing without prior notice.</li>
            </ul>
          </div>

          {/* No Liability */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              Korba One is not responsible for any disputes, losses, damages,
              or transactions that occur between users and sellers. Users
              interact at their own discretion and risk.
            </p>
          </div>

          {/* Content Ownership */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Content Ownership
            </h2>
            <p>
              Users retain ownership of the content they submit. By posting
              content, you grant Korba One a non-exclusive right to display
              and promote your listings within the platform.
            </p>
          </div>

          {/* Account Suspension */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Account Suspension
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that
              violate these Terms, engage in fraudulent activity, or harm
              the platform’s integrity.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Changes to Terms
            </h2>
            <p>
              Korba One may update these Terms and Conditions at any time.
              Continued use of the platform constitutes acceptance of the
              updated terms.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes
              shall fall under the jurisdiction of courts located in
              Chhattisgarh, India.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              10. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms, please contact:
            </p>
            <p className="mt-3 text-orange-500">
              info@korbaone.com
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
