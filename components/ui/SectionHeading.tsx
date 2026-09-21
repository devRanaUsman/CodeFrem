export default function SectionHeading({eyebrow,title,highlight,description,align="left"}: {eyebrow?:string;title:string;highlight?:string;description?:string;align?:"left"|"center"}) {
  return <div className={`section-heading mb-10 lg:mb-12 ${align === "center" ? "text-center" : ""}`}>
    {eyebrow && <p className={`section-label mb-5 ${align === "center" ? "justify-center" : ""}`}>{eyebrow.toUpperCase()}</p>}
    <h2 className="text-3xl sm:text-4xl">{title} {highlight && <span>{highlight}</span>}</h2>
    {description && <p className={align === "center" ? "mx-auto" : ""}>{description}</p>}
  </div>;
}

