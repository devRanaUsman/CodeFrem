import { Plus } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How long does a project take?",
    answer:
      "Project timelines depend on the scope, features, integrations, and technical requirements. Codefrem defines the scope and timeline before development begins, so you know what the project includes and when the planned work should be completed.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Yes, the project handover includes the completed software and the information needed to manage it. Ownership and handover details should be defined as part of the project scope and agreement before development begins.",
  },
  {
    question: "How are projects priced?",
    answer:
      "Projects use a fixed-scope pricing model based on the agreed features, deliverables, integrations, and development requirements. Codefrem provides the project cost after defining the scope, rather than using a generic hourly estimate.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Codefrem can continue maintaining and supporting your software after launch. Ongoing support can include fixing issues, handling required changes, and keeping the software maintained as your business needs evolve.",
  },
  {
    question: "Can you take over an existing project?",
    answer:
      "Yes, Codefrem can work with an existing project when its codebase, technical requirements, and current state can be assessed. The first step is reviewing the existing system and defining the work required for the takeover.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="home-section faq-section">
      <div className="section-label-row">
        <h2 className="section-label">FREQUENTLY ASKED QUESTIONS</h2>
        <span className="micro-note">ANSWERS BEFORE YOU ASK</span>
      </div>

      <div className="faq-grid">
        {/* Left column: display heading + support CTA */}
        <div className="faq-intro">
          <h2 className="faq-heading">
            QUESTIONS,<br />
            <span className="faq-heading-accent">ANSWERED</span>
          </h2>
          <p className="faq-intro-copy">
            Everything you need to know before starting a project with us. Still
            unsure about something? Ask us directly.
          </p>
          <Link href="/contact" className="faq-cta">
            <span className="faq-cta-dot" />
            ASK YOUR QUESTION
          </Link>
        </div>

        {/* Right column: accordion list */}
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} name="home-faq" className="faq-item glass-panel">
              <summary className="faq-question">
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon" aria-hidden="true"><Plus size={16} strokeWidth={2} /></span>
              </summary>
              <div className="faq-answer-inner"><p>{faq.answer}</p></div>
              <span className="faq-item-line" aria-hidden="true" />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
