import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./GiftSet.module.css";
import giftImage from "../../../../assets/images/HomePage/Gift/giftset1Img.png"; 
import giftImage2 from "../../../../assets/images/HomePage/Gift/giftset2Img.png"; 
import giftImage3 from "../../../../assets/images/HomePage/Gift/giftSet3Img.png";
import mountain from "../../../../assets/images/HomePage/Gift/mountain.png" 
import iconCoffee from "../../../../assets/images/HomePage/Gift/iconCoffee.png" 

const giftsetData = [
  {
    id: 1,
    img: giftImage,
    price: "285.000",
    title: 'Giftset "Vietnamese Phin Combo"',
    desc: "A wonderful gift for true coffee enthusiasts...",
    bean: "Fine Robusta Blend",
    altitude: "700 - 800m",
  },
  {
    id: 2,
    img: giftImage2,
    price: "300.000",
    title: 'Giftset "Premium CoffeeMorning Energy Set"',
    desc: "A premium coffee gift box for special occasions...",
    bean: "Arabica Blend",
    altitude: "1200m",
  },
  {
    id: 3,
    img: giftImage3,
    price: "260.000",
    title: 'Giftset "Artisan Coffee Pack"',
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
  <li>
    <img src={iconCoffee} alt="Coffee" className={styles.icon} />
    {giftsetData[active].bean}
  </li>
  <li>
    <img src={mountain} alt="Altitude" className={styles.icon} />
    {giftsetData[active].altitude}
  </li>
</ul>
          <div className={styles.buttons}>
            <NavLink to="/Gift-set" className={styles.buy}>
               Buy Now
            </NavLink>
            <NavLink to="/gift-set"className={styles.details}>
               Details
            </NavLink>
          </div>
        </div>

<div className={styles.nav}>
  {giftsetData.map((_, i) => (
    <span
      key={i}
      data-testid="gift-nav-button"
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