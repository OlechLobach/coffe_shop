import styles from "./GiftSet.module.css";
import giftImage from "../../../../assets/images/HomePage/Gift/giftset1Img.png"; 
import giftImage2 from "../../../../assets/images/HomePage/Gift/giftset2Img.png"; 
import giftImage3 from "../../../../assets/images/HomePage/Gift/giftSet3Img.png"; 
import React, { useState } from "react";

const giftsetData = [
  {
    id: 1,
    img: giftImage,
    price: "285.000",
    title: 'Giftset "Vietnamese Phin Coffee"',
    desc: "A wonderful gift for true coffee enthusiasts...",
    bean: "Fine Robusta Blend",
    altitude: "700 - 800m",
  },
  {
    id: 2,
    img: giftImage2,
    price: "300.000",
    title: 'Giftset "Premium Coffee"',
    desc: "A premium coffee gift box for special occasions...",
    bean: "Arabica Blend",
    altitude: "1200m",
  },
  {
    id: 3,
    img: giftImage3,
    price: "260.000",
    title: 'Giftset "Classic"',
    desc: "A classic choice for every coffee lover...",
    bean: "Robusta",
    altitude: "600 - 700m",
  },
];


const GiftsetSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      <h5 className={styles.subtitle}>Best Gift For Best Friend</h5>
      <h2 className={styles.title}>GIFTSET</h2>

      <div className={styles.container}>
        <div className={styles.image}>
          <img src={giftsetData[active].img} alt={giftsetData[active].title} />
        </div>

        <div className={styles.content}>
          <p className={styles.price}>{giftsetData[active].price}</p>
          <h3 className={styles.name}>{giftsetData[active].title}</h3>
          <p className={styles.desc}>{giftsetData[active].desc}</p>
          <ul className={styles.meta}>
            <li>☕ {giftsetData[active].bean}</li>
            <li>⛰ {giftsetData[active].altitude}</li>
          </ul>
          <div className={styles.buttons}>
            <button className={styles.buy}>Buy Now</button>
            <button className={styles.details}>Details</button>
          </div>
        </div>

        <div className={styles.nav}>
          {giftsetData.map((_, i) => (
            <span
              key={i}
              className={`${styles.num} ${i === active ? styles.active : ""}`}
              onClick={() => setActive(i)}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className={styles.rightBackground}></div>
      </div>
    </section>
  );
};

export default GiftsetSection;