import { useState } from "react";
import styles from "./Products.module.css";
import coffeeData from "../../../../data/HomePage/CoffeeSection/CoffeeData";

export default function ProductsCarousel() {
  // розбиваємо на слайди по 2 картки
  const slides = [];
  for (let i = 0; i < coffeeData.length; i += 2) {
    slides.push(coffeeData.slice(i, i + 2));
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const handlePrev = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slideWidth = 600; // ширина однієї колонки
  const gap = 40; // відстань між слайдами

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h5 className={styles.subtitle}>Choose Your Favorite</h5>
        <h2 className={styles.title}>Perfect Taste, Just Right</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.leftBackground}></div>

        <button className={`${styles.arrow} ${styles.prev}`} onClick={handlePrev}>
          ←
        </button>

        <div className={styles.carousel}>
          {slides.map((slide, index) => {
            const position = (index - currentSlide + totalSlides) % totalSlides;

            let style = {
              transform: `translateX(${slideWidth * 2}px) scale(0.8)`,
              filter: "blur(4px)",
              opacity: 0,
              zIndex: 1,
            };

            if (position === 0) {
              // центральна колонка
              style = {
                transform: `translateX(0px) scale(1)`,
                filter: "none",
                opacity: 1,
                zIndex: 5,
              };
            } else if (position === 1) {
              // права колонка
              style = {
                transform: `translateX(${slideWidth + gap}px) scale(0.9)`,
                filter: "blur(2px)",
                opacity: 0.7,
                zIndex: 3,
              };
            } else if (position === totalSlides - 1) {
              // ліва колонка
              style = {
                transform: `translateX(-${slideWidth + gap}px) scale(0.9)`,
                filter: "blur(2px)",
                opacity: 0.7,
                zIndex: 3,
              };
            }

            return (
              <div
                key={index}
                className={styles.slide}
                style={{
                  ...style,
                  position: "absolute",
                  top: 0,
                  transition: "all 0.5s ease",
                }}
              >
                {slide.map((product) => (
                  <div key={product.id} className={styles.card}>
                    <div className={styles.cardLeft}>
                      <img src={product.img} alt={product.name} />
                    </div>
                    <div className={styles.cardRight}>
                      <p className={styles.price}>{product.price}</p>
                      <h3 className={styles.coffeeName}>{product.name}</h3>
                      <p className={styles.description}>{product.desc}</p>
                      <div className={styles.buttons}>
                        <button className={styles.btn}>Buy Now</button>
                        <button className={styles.btn}>Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.next}`} onClick={handleNext}>
          →
        </button>
      </div>
    </section>
  );
}
