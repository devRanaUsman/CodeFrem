import Link from "next/link";
export default function Footer() {
  return <footer className="reference-footer"><span><i/> © {new Date().getFullYear()} CODEFREM</span><nav aria-label="Footer navigation"><Link href="/services">SERVICES</Link><Link href="/projects">WORK</Link><Link href="/about">ABOUT</Link><Link href="/contact">CONTACT</Link></nav><a href="#top">DESIGNED TO INSPIRE <b>▰</b></a></footer>;
}

