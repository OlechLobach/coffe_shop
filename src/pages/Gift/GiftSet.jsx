import styles from "./GiftSet.module.css";
import giftImage from "../../assets/images/HomePage/Gift/giftSet.png"; 
import React, { useState } from "react";

const giftsetData = [
  {
    id: 1,
    img: giftImage,
    price: "285.000",
    title: 'Giftset "Cà phê phin Việt Nam"',
    desc: "Món quà tuyệt vời dành cho người sành cà phê...",
    bean: "Fine Robusta Blend",
    altitude: "700 - 800m",
  },
  {
    id: 2,
    img: giftImage,
    price: "300.000",
    title: 'Giftset "Premium Coffee"',
    desc: "Hộp quà với cà phê cao cấp dành cho dịp đặc biệt...",
    bean: "Arabica Blend",
    altitude: "1200m",
  },
  {
    id: 3,
    img: giftImage,
    price: "260.000",
    title: 'Giftset "Classic"',
    desc: "Lựa chọn cổ điển cho mọi người yêu cà phê...",
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
            <button className={styles.buy}>MUA NGAY</button>
            <button className={styles.details}>CHI TIẾT</button>
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