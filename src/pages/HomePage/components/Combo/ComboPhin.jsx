  import React, { useState, useEffect, useRef } from "react";
  import { NavLink } from "react-router-dom";
  import styles from "./ComboPhin.module.css";
  import comboData from "../../../../data/HomePage/Combo/comboData";

  export default function ComboSection() {
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

    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + comboData.length) % comboData.length);
    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % comboData.length);
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
          <h5 className={styles.subtitle}>Your Personalized Combo</h5>
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
            {comboData.map((combo) => (
              <div key={combo.id} className={styles.card}>
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
                  <NavLink to="/phin-combo" className={styles.btn}>Buy Now</NavLink>
                  <NavLink to="/phin-combo" className={styles.btn}>Details</NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.container}>
            <button className={`${styles.arrow} ${styles.prev}`} onClick={handlePrev}>←</button>
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
                      <NavLink to="/phin-combo" className={styles.btn}>Buy Now</NavLink>
                      <NavLink to="/phin-combo" className={styles.btn}>Details</NavLink>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className={`${styles.arrow} ${styles.next}`} onClick={handleNext}>→</button>
            <div className={styles.rightBackground}></div>
          </div>
        )}
      </section>
    );
  }
