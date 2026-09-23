import Image from "next/image";
import styles from "./HeroTechScene.module.css";

import heroArtwork from "@/public/images/hero-tech-reference.webp";

export default function HeroTechScene() {
  return <div className={styles.scene} aria-hidden="true">
    <Image src={heroArtwork} alt="" fill sizes="(max-width: 767px) 100vw, 610px" unoptimized loading="eager" fetchPriority="high" className={styles.artwork} />
  </div>;
}
