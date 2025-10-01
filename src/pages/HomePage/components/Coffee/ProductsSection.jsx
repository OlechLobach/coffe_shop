import { useRef, useState, useEffect } from "react";
import styles from "./Products.module.css";
import coffeeData from "../../../../data/HomePage/CoffeeSection/CoffeeData";

function ProductsSection() {
  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setIsStart(scrollLeft <= 0);
    setIsEnd(scrollLeft >= maxScroll - 5);

    const opacity = 1 - scrollLeft / maxScroll;
    setOverlayOpacity(opacity);
  };

  const getCardStep = () => {
    const card = scrollRef.current.querySelector(`.${styles.card}`);
    if (!card) return 0;
    const gap = 20; 
    return card.offsetWidth + gap;
  };

  const handlePrev = () => {
    const step = getCardStep();
    scrollRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const handleNext = () => {
    const step = getCardStep();
    scrollRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    el.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h5 className={styles.subtitle}>Choose Your Favorite</h5>
        <h2 className={styles.title}>Perfect Taste, Just Right</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.leftBackground}></div>

        <button
          className={`${styles.arrow} ${styles.prev}`}
          onClick={handlePrev}
          disabled={isStart}
          aria-label="Scroll Left"
        >
          ←
        </button>

        <div
          className={styles.right}
          ref={scrollRef}
          style={{ "--overlay-opacity": overlayOpacity }}
        >
          {coffeeData.map((product) => (
            <div className={styles.card} key={product.id}>
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

        <button
          className={`${styles.arrow} ${styles.next}`}
          onClick={handleNext}
          disabled={isEnd}
          aria-label="Scroll Right"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default ProductsSection;
