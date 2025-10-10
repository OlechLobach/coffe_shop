import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import coffeeData from "../../../../data/HomePage/CoffeeSection/CoffeeData";
import styles from "./Products.module.css";

export default function ProductsCarousel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const sliderRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => (isDownRef.current = false);
  const handleMouseUp = () => (isDownRef.current = false);
  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchStart = (e) => handleMouseDown(e.touches[0]);
  const handleTouchMove = (e) => handleMouseMove(e.touches[0]);
  const handleTouchEnd = () => handleMouseUp();

  const slides = [];
  for (let i = 0; i < coffeeData.length; i += 2) {
    slides.push(coffeeData.slice(i, i + 2));
  }
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const handlePrev = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h5 className={styles.subtitle}>Choose Your Favorite</h5>
        <h2 className={styles.title}>Perfect Taste, Just Right</h2>
      </div>

      {isMobile ? (
        <div
          className={styles.sliderMobile}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {coffeeData.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.cardLeft}>
                <img src={product.img} alt={product.name} />
              </div>
              <div className={styles.cardRight}>
                <p className={styles.price}>{product.price}</p>
                <h3 className={styles.coffeeName}>{product.name}</h3>
                <p className={styles.description}>{product.desc}</p>
                <div className={styles.buttons}>
                  <NavLink to="/coffee" className={styles.btn}>Buy Now</NavLink>
                  <NavLink to="/coffee" className={styles.btn}>Details</NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.containerPC}>
          <div className={styles.leftBackground}></div>
          <button data-testid="prev-button" className={`${styles.arrow} ${styles.prev}`} onClick={handlePrev}>←</button>
          <div className={styles.carousel}>
            {slides.map((slide, index) => {
              const position = (index - currentSlide + totalSlides) % totalSlides;
              let style = { transform: `translateX(${600 * 2}px) scale(0.8)`, filter: "blur(4px)", opacity: 0, zIndex: 1 };
              if (position === 0) style = { transform: `translateX(0px) scale(1)`, filter: "none", opacity: 1, zIndex: 5 };
              else if (position === 1) style = { transform: `translateX(${600 + 40}px) scale(0.9)`, filter: "blur(2px)", opacity: 0.7, zIndex: 3 };
              else if (position === totalSlides - 1) style = { transform: `translateX(-${600 + 40}px) scale(0.9)`, filter: "blur(2px)", opacity: 0.7, zIndex: 3 };

              return (
                <div key={index} className={styles.slide} style={{ ...style, position: "absolute", top: 0, transition: "all 0.5s ease" }}>
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
                          <NavLink to="/coffee" className={styles.btn}>Buy Now</NavLink>
                          <NavLink to="/coffee" className={styles.btn}>Details</NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
          <button data-testid="next-button" className={`${styles.arrow} ${styles.next}`} onClick={handleNext}>→</button>
        </div>
      )}
    </section>
  );
}
