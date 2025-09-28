import React, {  useState  } from "react";
import styles from "./ComboPhin.module.css";
import comboData from "../../data/HomePage/Combo/comboData";

export default function ComboSection() {
  const [startIndex, setStartIndex] = useState(0); 
  const visibleCount = 3; 

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, comboData.length - visibleCount));
  };

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h5 className={styles.subtitle}>Your Personalized Coffee</h5>
        <h2 className={styles.title}>COMBO PHIN</h2>
      </div>

      <div className={styles.container}>
        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ←
        </button>
        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={handleNext}
          disabled={startIndex >= comboData.length - visibleCount}
        >
          →
        </button>

        <div className={styles.sliderWrapper}>
          <div className={styles.left}>
            {comboData
              .slice(startIndex, startIndex + visibleCount)
              .map((combo) => (
                <div className={styles.card} key={combo.id}>
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
              ))}
          </div>
        </div>

        <div className={styles.rightBackground}></div>
      </div>
    </section>
  );
}
