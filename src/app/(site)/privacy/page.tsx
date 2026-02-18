"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <main className="bg-bg-primary min-h-screen pt-32 pb-24 text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-display font-black text-4xl md:text-6xl mb-8">Privacy Policy</h1>

                    <div className="prose prose-invert max-w-none font-dm-sans text-zinc-400">
                        <p className="lead">Last Updated: {new Date().toLocaleDateString()}</p>

                        <h3>1. Introduction</h3>
                        <p>Welcome to Vedanco. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we look after your personal data when you visit our website and tells you about your privacy rights and how the law protects you.</p>

                        <h3>2. Data We Collect</h3>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul>
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
                        </ul>

                        <h3>3. How We Use Your Data</h3>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul>
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>

                        <h3>5. Contact Us</h3>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                        <p>
                            <strong>Vedanco Group</strong><br />
                            InfoCity, Super Mall 1, Office No. 421/C,<br />
                            Gandhinagar, Gujarat – India<br />
                            Email: vedanco.official@vedanco.com<br />
                            Phone: +91 6353 097 642
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
