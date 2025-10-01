import React from "react";
import Header from "./HomePage/components/Header/HeaderSection";
import Features from "./HomePage/components/Features/FeaturesSection";
import ProductsSection from "./HomePage/components/Coffee/ProductsSection";
import GiftsetSection from "./HomePage/components/Gift/GiftSet";
import ComboSection from "./HomePage/components/Combo/ComboPhin";
import Footer from "./HomePage/components/Footer/FooterSection";
export default function Home(){
    return(
        <div>
        <Features/>
        <ProductsSection/>
        <GiftsetSection/>
        <ComboSection/>
        </div>
    )
}
