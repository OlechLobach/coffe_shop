import React, { useState } from "react";
import styles from "./ComboPhin.module.css";
import comboData from "../../../../data/HomePage/Combo/comboData";

export default function ComboSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + comboData.length) % comboData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comboData.length);
  };

  const getPosition = (index) => {
    const total = comboData.length;
    if (index === currentIndex) return "center";
    if (index === (currentIndex - 1 + total) % total) return "left";
    if (index === (currentIndex + 1) % total) return "right";
    return "hidden";
  };

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h5 className={styles.subtitle}>Your Personalized Coffee</h5>
        <h2 className={styles.title}>COMBO PHIN</h2>
      </div>

      <div className={styles.container}>
        <button className={`${styles.arrow} ${styles.prev}`} onClick={handlePrev}>
          ←
        </button>

        <div className={styles.sliderWrapper}>
          {comboData.map((combo, index) => {
            const position = getPosition(index);
            return (
              <div key={combo.id} className={`${styles.card} ${styles[position]}`}>
                <div className={styles.cardImg}>
                  <img src={combo.img} alt={combo.name} />
                </div>
                <div className={styles.allPrice}>
                  <p className={styles.newPrice}>{combo.price}</p>
                  <p className={styles.oldPrice}>{combo.oldPrice}</p>
                </div>
                <h3 className={styles.coffeeName}>{combo.name}</h3>
                <p className={styles.description}>{combo.desc}</p>
                <div className={styles.buttons}>
                  <button className={styles.btn}>Buy Now</button>
                  <button className={styles.btn}>Details</button>
                </div>
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.next}`} onClick={handleNext}>
          →
        </button>

        <div className={styles.rightBackground}></div>
      </div>
    </section>
  );
}