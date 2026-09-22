import Image from "next/image";
import styles from "./HeroTechScene.module.css";

export default function HeroTechScene() {
  return <div className={styles.scene} aria-hidden="true">
    <Image src="/images/hero-tech-reference.webp" alt="" fill sizes="(max-width: 767px) 100vw, 610px" preload className={styles.artwork} />
  </div>;
}
