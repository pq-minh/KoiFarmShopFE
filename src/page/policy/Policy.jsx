import React, { useState } from 'react';
import Header from "../../component/header";
import "./Policy.css";

const Policy = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='policy-page'>
      <Header setIsLoggedIn={setIsLoggedIn} />

      <div className="privacy-policy">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated:</strong> November 6, 2024</p>

        {/* Section 1 */}
        <section>
          <h2 className='text-title'>1. Introduction</h2>
          <p>
            We, Koi Farm Shop, are committed to protecting the privacy and security of our users' personal information.
            This policy describes how we collect, use, and protect your data when you use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully to understand how we handle your information and your rights.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className='text-title'>2. About Koi Farm Shop Services</h2>
          <h3>- Koi Fish Consignment Service</h3>
          <ul>
            <li>We only allow consignment of koi fish, not consignments of koi lots.</li>
            <li>After you consign your koi fish, our staff will determine the price for the koi you consign.</li>
            <li>While the koi is not yet approved, you may cancel the consignment at any time.</li>
            <li>If the price we propose is unreasonable for you, you can reject the consignment.</li>
            <li>We only allow consignment of koi for a maximum of 60 days from the start date of the consignment.</li>
          </ul>
          
          <h3>- Koi Fish Consignment Fees</h3>
          <ul>
            <li>For koi priced between 100,000 - 600,000 VND, the consignment fee is 20.000 VND.</li>
            <li>For koi priced between 600,000 - 1,000,000 VND, the consignment fee is 50.000 VND.</li>
            <li>For koi priced between 1,000,000 - 2,000,000 VND, the consignment fee is 100.000 VND.</li>
            <li>If the koi value exceeds these amounts, we will contact the customer directly.</li>
          </ul>

          <h3>- Post-Purchase Koi Consignment Service</h3>
          <ul>
            <li>After purchasing koi, you can consign them at our shop for care.</li>
            <li>We will take care of your koi for a period of 30 days from the consignment date.</li>
            <li>We will contact you around day 27 of the consignment period.</li>
            <li>Note: If we cannot contact you, we will send the koi to the delivery address you provided.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className='text-title'>3. Information We Collect</h2>
          <p>
            We may collect the following types of information from users:
          </p>
          <ul>
            <li><strong>Personal Information</strong>: This includes your name, email address, phone number, shipping address, and other account-related information.</li>
            <li><strong>Payment Information</strong>: This includes your credit card number and other payment details when you make transactions on our platform.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className='text-title'>4. How We Use Your Information</h2>
          <p>
            We use your personal information for the following purposes:
          </p>
          <ul>
            <li><strong>Provide Services</strong>: To process your requests, complete transactions, and provide the services you request.</li>
            <li><strong>Improve User Experience</strong>: To enhance our products and services based on user behavior analysis.</li>
            <li><strong>Marketing</strong>: We may send you promotional emails or messages about new products, services, or offers, if you have opted to receive such information from us.</li>
            <li><strong>Security</strong>: To ensure the safety of our services and protect your account from fraud or misuse.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className='text-title'>5. How We Protect Your Information</h2>
          <p>
            We use reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption technologies, security checks, and employee training.
          </p>
          <p>
            However, no transmission method over the Internet or electronic storage method is 100% secure. Therefore, while we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className='text-title'>6. Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties except in the following cases:
          </p>
          <ul>
            <li><strong>Partners and Service Providers</strong>: We may share information with partners and service providers who assist us in providing services to you (such as payment companies or delivery services).</li>
            <li><strong>Legal Requirements</strong>: We may disclose your information if required by law, such as to comply with legal processes, court orders, or requests from government authorities.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className='text-title'>7. Your Rights</h2>
          <p>
            You have the following rights regarding your personal information:
          </p>
          <ul>
            <li><strong>Access to Personal Information</strong>: You can request a copy of the personal information we hold about you.</li>
            <li><strong>Rectification of Personal Information</strong>: If your information is incorrect or needs to be updated, you can request a correction.</li>
            <li><strong>Deletion of Information</strong>: You can request the deletion of your personal information, unless we need to retain it for legal or contractual reasons.</li>
            <li><strong>Withdraw Consent</strong>: If you have agreed to receive marketing communications from us, you can withdraw your consent at any time.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className='text-title'>8. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to modify or update this Privacy Policy at any time. Any changes will be posted on our website along with the updated date. Please check periodically for the latest information about how we protect your privacy.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className='text-title'>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us via email at <a href="KOIFARMSHOP@gmail.com">KoiFarmShop@gmail.com</a> or call us at +84 03342123651.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Policy;
