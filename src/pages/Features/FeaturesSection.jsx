import React from "react";
import { Link } from "react-router-dom";
import styles from "./features.module.css"
import icon1 from "../../assets/images/HomePage/Feature/icon1.png"
import icon2 from "../../assets/images/HomePage/Feature/icon2.png"
import icon3 from "../../assets/images/HomePage/Feature/icon3.png"
import icon4 from "../../assets/images/HomePage/Feature/icon4.png"
function Features() {
    const featuresData = [
        {
            icon: icon1,
            title: 'Origin',
            description: 'Arabica and Robusta coffee beans meet international quality standards.'
        },
        {
            icon: icon2,
            title: 'Quality',
            description: 'Each coffee bean represents the result of a highly focused process by skilled coffee artisans.'
        },
        {
            icon: icon3,
            title: 'Types of Beans',
            description: '70% of the coffee cup’s quality comes from the origin and quality of the green beans.'
        },
        {
            icon:icon4,
            title:'Brewing',
            description:'The coffee beans are transformed through a careful and rigorous roasting and grinding process.'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h5 className={styles.subtitle}>Your Personalized Coffee</h5>
                <h2 className={styles.title}>Coffee build your base</h2>

                <div className={styles.featuresGrid}>
                    {featuresData.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <img src={feature.icon} alt={feature.title} className={styles.icon} />
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDesc}>{feature.description}</p>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
}

export default Features;