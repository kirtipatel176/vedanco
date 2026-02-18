"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <main className="bg-bg-primary min-h-screen pt-32 pb-24 text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-display font-black text-4xl md:text-6xl mb-8">Terms of Service</h1>

                    <div className="prose prose-invert max-w-none font-dm-sans text-zinc-400">
                        <p className="lead">Last Updated: {new Date().toLocaleDateString()}</p>

                        <h3>1. Agreement to Terms</h3>
                        <p>By accessing our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

                        <h3>2. Intellectual Property Rights</h3>
                        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &ldquo;Content&rdquo;) and the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.</p>

                        <h3>3. User Representations</h3>
                        <p>By using the Site, you represent and warrant that:</p>
                        <ul>
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                        </ul>

                        <h3>4. Prohibited Activities</h3>
                        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

                        <h3>5. Contact Us</h3>
                        <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
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
