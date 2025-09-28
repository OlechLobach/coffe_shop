import React from "react";
import Header from "./Header/HeaderSection";
import Features from "./Features/FeaturesSection";
import ProductsSection from "./Coffee/ProductsSection";
import GiftsetSection from "./Gift/GiftSet";
import ComboSection from "./Combo/ComboPhin";
import Footer from "./Footer/FooterSection";
export default function Home(){
    return(
        <div>
        <Header/>
        <Features/>
        <ProductsSection/>
        <GiftsetSection/>
        <ComboSection/>
        <Footer/>
        </div>
    )
}
