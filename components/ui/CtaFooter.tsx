import CtaStrip from "./CtaStrip";
export default function CtaFooter({title="Have a project in mind?",label="Start a Project"}: {title?:string;label?:string}) {
  return <CtaStrip title={title} label={label} subtext="Let's turn your next idea into a thoughtful digital experience." />;
}
