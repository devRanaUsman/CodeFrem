export default function PageHero({ eyebrow, line1, highlight, line2, lead }: {
  eyebrow: string; line1: string; highlight: string; line2?: string; lead: string;
}) {
  return <section className="page-intro"><div className="studio-container">
    <p className="studio-eyebrow"><span />{eyebrow}</p>
    <h1>{line1} <span>{highlight}</span>{line2 ? ` ${line2}` : ""}</h1>
    <p className="page-intro-lead">{lead}</p>
  </div></section>;
}


