import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-8" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 32px)" }}>
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to TipHelper
        </Link>

        <header className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold mb-3">TipHelper</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">Privacy &amp; Legal</h1>
          <p className="mt-3 text-muted-foreground text-sm">Last updated: May 2026</p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed">

          {/* Privacy Policy */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Privacy Policy</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">We don't collect any personal data.</span> TipHelper stores
                your preferences (dark mode, location, budget mode) only in your device's local storage — nothing is sent
                to any server.
              </p>
              <p>
                When you use the international tipping feature, a prompt describing your country is sent to an AI language
                model to generate a cultural insight. No personally identifiable information is included in that request.
              </p>
              <p>
                We don't use analytics, tracking pixels, or third-party data brokers. What happens in the app stays in
                the app.
              </p>
              <p>
                If you have questions about this policy, contact us at{" "}
                <a href="mailto:mediocreatbestdev@outlook.com" className="text-accent hover:underline">
                  mediocreatbestdev@outlook.com
                </a>
                .
              </p>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Terms of Use */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Terms of Use</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                By using TipHelper, you agree to use the app for lawful, personal purposes only. The tipping guidance
                provided is informational and based on general US and international customs — it is not financial or
                professional advice.
              </p>
              <p>
                We make no guarantees that the suggested tip amounts are appropriate for every situation. Always use your
                own judgment. TipHelper is not liable for any outcomes resulting from following the app's suggestions.
              </p>
              <p>
                We reserve the right to modify or discontinue the app or any of its features at any time without notice.
              </p>
              <p>
                These terms are governed by applicable law. By continuing to use TipHelper, you accept any updates to
                these terms.
              </p>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Copyright & Intellectual Property */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Copyright &amp; Intellectual Property</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">© 2026 TipHelper. All rights reserved.</span>
              </p>
              <p>
                All content, design, code, and tipping guidance within TipHelper — including but not limited to text,
                graphics, user interface elements, and logic — are the intellectual property of TipHelper and are
                protected under applicable copyright laws.
              </p>
              <p className="font-medium text-foreground">Restrictions</p>
              <p>
                You may not copy, reproduce, distribute, modify, or create derivative works from any part of the
                TipHelper application without prior written consent. Unauthorized use may violate copyright and
                applicable laws.
              </p>
              <p>
                For licensing inquiries, contact{" "}
                <a href="mailto:mediocreatbestdev@outlook.com" className="text-accent hover:underline">
                  mediocreatbestdev@outlook.com
                </a>
                .
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}