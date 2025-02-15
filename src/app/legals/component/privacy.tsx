import React from 'react';

export default function Privacy() {
    return (
        <div>
            <p className="py-6">Date of last revision: Jan 29th, 2025</p>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Overview</h3>
                <p className="text-base text-text_weak pb-6">Quicktrads values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.</p>
                <p className="text-base text-text_weak">By using Quicktrads, you agree to the terms outlined in this policy. If you do not agree, please discontinue use of our site.</p>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Information we collect</h3>
                <p className="text-base text-text_strong pb-3">We collect the following types of information:</p>
                <ul className="list-disc pl-5 text-base text-text_weak">
                    <li>Personal Information: Name, email address, phone number, shipping and billing address, payment information (processed securely through third-party payment providers).</li>
                    <li>Non-Personal Information: Browser type, device information, IP address, and browsing behavior on our site.</li>
                    <li>Optional Information: Reviews, comments, and other user-generated content you submit.</li>
                </ul>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">How we use your information</h3>
                <p className="text-base text-text_strong pb-3">We use your information for:</p>
                <ul className="list-disc pl-5 text-base text-text_weak">
                    <li>Processing orders and transactions.</li>
                    <li>Providing customer support and responding to inquiries.</li>
                    <li>Improving our website and user experience.</li>
                    <li>Sending updates, promotions, or marketing materials (you can opt out anytime).</li>
                    <li>Detecting and preventing fraudulent activities.</li>
                </ul>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">How we share your information</h3>
                <p className="text-base text-text_strong pb-3">We do not sell or rent your personal information. However, we may share your data with trusted third parties, including:</p>
                <ul className="list-disc pl-5 text-base text-text_weak">
                    <li>Payment processors to complete transactions.</li>
                    <li>Delivery partners to ship your orders.</li>
                    <li>Service providers to improve website functionality and marketing.</li>
                    <li>Legal or regulatory authorities when required by law.</li>
                </ul>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Data protection</h3>
                <p>We take reasonable precautions to protect your personal data. However, no online platform is 100% secure. You are responsible for safeguarding your account credentials.</p>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Cookies and tracking technologies</h3>
                <p className="text-base text-text_strong pb-3">We use cookies to enhance your browsing experience. Cookies allow us to:</p>
                <ul className="list-disc pl-5 text-base text-text_weak">
                    <li>Understand site usage and visitor preferences.</li>
                    <li>Provide personalized content and advertisements.</li>
                </ul>
                <p>You can manage your cookie preferences through your browser settings.</p>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Your rights</h3>
                <p className="text-base text-text_strong pb-3">You have the right to:</p>
                <ul className="list-disc pl-5 text-base text-text_weak">
                    <li>Access and request a copy of your personal data.</li>
                    <li>Correct or update inaccurate information.</li>
                    <li>Request the deletion of your data (subject to legal obligations).</li>
                    <li>Opt-out of marketing communications.</li>
                </ul>
                <p>To exercise your rights, contact us at [Insert Contact Email].</p>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Changes to this policy</h3>
                <p>We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting. We encourage you to review this policy periodically.</p>
            </div>

            <div className="pb-6">
                <h3 className="font-[500] text-[18px] text-text_strong pb-2">Contact us</h3>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p>Email: Insert Contact Email</p>
                <p>Phone: Insert Contact Phone</p>
            </div>
        </div>
    );
}
